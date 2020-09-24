import { HttpService, Injectable } from '@nestjs/common';
import qs from 'qs';
import * as jwt from 'jsonwebtoken';

import { SsoConfig } from './config/sso.config';
import { getJwksKey, validateToken } from './utility/validate-token.util';
import { errorHandler } from './utility/error.handler';


@Injectable()
export class AppService {
  response = {code: 200, status: 'success', data: null, error: null }
  constructor(private httpService: HttpService) {};
  
  async azureLogin(req) {
    try {
      const { code } = req.params;
      const headers = { 'content-type': 'application/x-www-form-urlencoded' };
      const azureData: any = await this.httpService.post(
        process.env.SSO_TOKEN_ENDPOINT,
        qs.stringify(SsoConfig(code)),
        { headers },
      ).toPromise();

      const idToken: any = await new Promise((resolve) => {
        jwt.verify(azureData.data.id_token, getJwksKey, (err, decoded) => {
          if (err) resolve(null);
          resolve(decoded);
        })
      })

      if (!validateToken(idToken)) {
        return errorHandler(
          403,
          'invalid token'
        )
      }

      await this._graphData(azureData.data.access_token);
      this.response['status'] = 'authenticated';
      this.response['token'] = idToken;
      return this.response;
    } catch (error) {
      return errorHandler(
        500,
        'Internal server error'
      )
    }
  }

  private async _graphData(accessToken: string) {
    const headers = {'Authorization': `Bearer ${accessToken}`};
    const graph = await this.httpService.get(process.env.SSO_GRAPH_URL, { headers }).toPromise();
    this.response['graph'] = graph.data ? graph.data : null;
  }
}
