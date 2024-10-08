type Config = {
    postgres: {
        user: string | undefined,
        hostname: string | undefined,
        database: string | undefined,
        password: string | undefined,
        port: number,
        tls: object,
    },
    app: {
        port: number
    }
}

function getAppConfig(): Config {
    return {
        app: {
            port: Number(Deno.env.get("APP_PORT")) || 5000,
        },
        postgres: {
            user        : Deno.env.get("PG_USERNAME"),
            hostname    : Deno.env.get("PG_HOSTNAME"),
            database    : Deno.env.get("PG_DATABASE"),
            password    : Deno.env.get("PG_PASSWORD"),
            port        : Number(Deno.env.get("PG_PORT")) || 5432,
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
