import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  AppThemeProvider,
  DialogManager,
  DialogManagerScope,
  IconsProvider,
  SnackBarProvider,
  SnackBarProviderScope,
  ThemeType,
} from 'twenty-ui';

import { ApolloProvider } from '@/apollo/components/ApolloProvider';
import { ClientConfigProvider } from '@/client-config/components/ClientConfigProvider';
import { ApolloDevLogEffect } from '@/debug/components/ApolloDevLogEffect';
import { RecoilDebugObserverEffect } from '@/debug/components/RecoilDebugObserver';
import { AppErrorBoundary } from '@/error-handler/components/AppErrorBoundary';
import { ExceptionHandlerProvider } from '@/error-handler/components/ExceptionHandlerProvider';
import { PromiseRejectionEffect } from '@/error-handler/components/PromiseRejectionEffect';
import { ApolloMetadataClientProvider } from '@/object-metadata/components/ApolloMetadataClientProvider';
import { ObjectMetadataItemsProvider } from '@/object-metadata/components/ObjectMetadataItemsProvider';
import { PrefetchDataProvider } from '@/prefetch/components/PrefetchDataProvider';
import { UserProvider } from '@/users/components/UserProvider';
import { PageChangeEffect } from '~/effect-components/PageChangeEffect';

import '@emotion/react';

import { App } from './App';

import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <RecoilRoot>
    <AppErrorBoundary>
      <RecoilDebugObserverEffect />
      <ApolloDevLogEffect />
      <BrowserRouter>
        <SnackBarProviderScope snackBarManagerScopeId="snack-bar-manager">
          <IconsProvider>
            <ExceptionHandlerProvider>
              <ApolloProvider>
                <HelmetProvider>
                  <ClientConfigProvider>
                    <UserProvider>
                      <ApolloMetadataClientProvider>
                        <ObjectMetadataItemsProvider>
                          <PrefetchDataProvider>
                            <AppThemeProvider>
                              <SnackBarProvider>
                                <DialogManagerScope dialogManagerScopeId="dialog-manager">
                                  <DialogManager>
                                    <StrictMode>
                                      <PromiseRejectionEffect />
                                      <App />
                                    </StrictMode>
                                  </DialogManager>
                                </DialogManagerScope>
                              </SnackBarProvider>
                            </AppThemeProvider>
                          </PrefetchDataProvider>
                          <PageChangeEffect />
                        </ObjectMetadataItemsProvider>
                      </ApolloMetadataClientProvider>
                    </UserProvider>
                  </ClientConfigProvider>
                </HelmetProvider>
              </ApolloProvider>
            </ExceptionHandlerProvider>
          </IconsProvider>
        </SnackBarProviderScope>
      </BrowserRouter>
    </AppErrorBoundary>
  </RecoilRoot>,
);

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
