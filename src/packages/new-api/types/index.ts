import type { Documents } from "./defs";
import type { OptionalKeys } from "./helpers";

export type EnvironmentType = "Sandbox" | "Production";

export type QBResponse<SuccessfulResponse extends Record<string, any>> =
    (
        SuccessfulResponse
        & {
            fault?: undefined;
            Fault?: undefined;
            time: number;
        }
    ) | (
        OptionalKeys<SuccessfulResponse>
        & {
            fault: {
                error: {
                    detail: string;
                    message: string;
                    code: string;
                }[],
                type: string;
            },
            Fault?: undefined;
            time: number;
        }
    ) | (
        OptionalKeys<SuccessfulResponse>
        & {
            Fault: {
                Error: {
                    Detail: string;
                    Message: string;
                    code: string;
                    element: string | null;
                }[];
                type: string;
            },
            fault?: undefined;
            time: number;
        }
    )

export type { Documents };