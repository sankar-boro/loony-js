type Config = {
    postgres: {
        user: string | undefined,
        hostname: string | undefined,
        database: string | undefined,
        password: string | undefined,
        port: string | undefined,
        tls: object,
    },
}

function getAppConfig(): Config {
    return {
        postgres: {
            user        : Deno.env.get("PG_USERNAME"),
            hostname    : Deno.env.get("PG_HOSTNAME"),
            database    : Deno.env.get("PG_DATABASE"),
            password    : Deno.env.get("PG_PASSWORD"),
            port        : Deno.env.get("PG_PORT"),
            tls         : {
                caCertificates: [Deno.env.get("PG_CERTIFICATE") || ""],
                enabled: false
            }
        }
    }
}

export {
  getAppConfig
};

export type { Config };
