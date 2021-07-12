export interface Linha {
    id: number;
    numero: number;
    nome: string;
    ativa: boolean;
    tipo: TipoLinha
}

export enum TipoLinha {
    CIRCULAR="CIRCULAR",
    TERMINAL_TERMINAL="TERMINAL_TERMINAL",
    TERMINAL_BAIRRO="TERMINAL_BAIRRO",
    BAIRRO_BAIRRO="BAIRRO_BAIRRO"
}