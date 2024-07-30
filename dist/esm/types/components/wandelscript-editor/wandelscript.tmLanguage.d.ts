declare const _default: {
    $schema: string;
    name: string;
    patterns: {
        include: string;
    }[];
    repository: {
        keywords: {
            patterns: {
                name: string;
                match: string;
            }[];
        };
        strings: {
            name: string;
            begin: string;
            end: string;
            patterns: {
                name: string;
                match: string;
            }[];
        };
        comments: {
            patterns: {
                begin: string;
                beginCaptures: {
                    "0": {
                        name: string;
                    };
                };
                end: string;
                name: string;
            }[];
        };
        functions: {
            patterns: {
                match: string;
                name: string;
            }[];
        };
    };
    scopeName: string;
};
export default _default;
