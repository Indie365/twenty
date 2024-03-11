import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';

import { GoogleAPIsProviderEnabledGuard } from 'src/core/auth/guards/google-apis-provider-enabled.guard';
import { GoogleAPIsOauthGuard } from 'src/core/auth/guards/google-apis-oauth.guard';
import { GoogleAPIsRequest } from 'src/core/auth/strategies/google-apis.auth.strategy';
import { GoogleAPIsService } from 'src/core/auth/services/google-apis.service';
import { TokenService } from 'src/core/auth/services/token.service';
import { EnvironmentService } from 'src/integrations/environment/environment.service';

@Controller('auth/google-apis')
export class GoogleAPIsAuthController {
  constructor(
    private readonly googleAPIsService: GoogleAPIsService,
    private readonly tokenService: TokenService,
    private readonly environmentService: EnvironmentService,
  ) {}

  @Get()
  @UseGuards(GoogleAPIsProviderEnabledGuard, GoogleAPIsOauthGuard)
  async googleAuth() {
    // As this method is protected by Google Auth guard, it will trigger Google SSO flow
    return;
  }

  @Get('get-access-token')
  @UseGuards(GoogleAPIsProviderEnabledGuard, GoogleAPIsOauthGuard)
  async googleAuthGetAccessToken(
    @Req() req: GoogleAPIsRequest,
    @Res() res: Response,
  ) {
    const { user } = req;

    const { email, accessToken, refreshToken, transientToken } = user;

    const { workspaceMemberId, workspaceId } =
      await this.tokenService.verifyTransientToken(transientToken);

    const demoWorkspaceIds = this.environmentService.getDemoWorkspaceIds();

    if (demoWorkspaceIds.includes(workspaceId)) {
      throw new Error('Cannot connect Google account to demo workspace');
    }

    if (!workspaceId) {
      throw new Error('Workspace not found');
    }

    if (workspaceId)
      await this.googleAPIsService.saveConnectedAccount({
        handle: email,
        workspaceMemberId: workspaceMemberId,
        workspaceId: workspaceId,
        provider: 'google',
        accessToken,
        refreshToken,
      });

    return res.redirect(
      `${this.environmentService.getFrontBaseUrl()}/settings/accounts`,
    );
  }
}
