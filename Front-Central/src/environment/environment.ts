// environment.ts
export const environment = {
  production: false,
  backends: {
    central: {
      nodeUrl: 'https://hospital-central.duckdns.org/api', 
    },
    cuenca: {
      springUrl: 'https://hospital-cuenca.duckdns.org/api', 
    },
    guayaquil: {
      springUrl: 'https://hospital-guayaquil.duckdns.org/api',
    },
    latacunga: {
      springUrl: 'https://hospital-latacunga.duckdns.org/api',
    },
  },
};
