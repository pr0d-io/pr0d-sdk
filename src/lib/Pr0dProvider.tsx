"use client";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePr0d } from './Pr0d';

export function Pr0dProvider({ appId, children }: { appId: string, children: React.ReactNode }) {
    const [Pr0d, setPr0d] = useState<any>(null);
    const [queryClient] = useState(() => new QueryClient());

    useEffect(() => {
        // Dynamically import Pr0d only on the client
        import("./Pr0d").then((mod) => {
            setPr0d(() => mod.default || mod);
        });
    }, []);

    if (!Pr0d) {
        return <div>Loading authentication...</div>;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Pr0d appId={appId}>{children}</Pr0d>
        </QueryClientProvider>
    );
}

export { usePr0d };
export default Pr0dProvider; 