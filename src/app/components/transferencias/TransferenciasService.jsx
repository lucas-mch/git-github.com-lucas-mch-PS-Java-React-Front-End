export const columns = [
    {
        field: 'dataTransferencia',
        headerName: 'Dados',
        width: 250,
        type: 'date',
        sortable: false,
        editable: false,
        valueGetter: (params) => new Date(params.row.dataTransferencia),
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'valor',
        headerName: 'Valentia',
        sortable: false,
        type: 'number',
        width: 250,
        editable: false,
        valueFormatter: ({ value }) => currencyFormatter.format(value),
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'tipoTransferencia',
        headerName: 'Tipo',
        sortable: false,
        width: 250,
        editable: false,
        align: 'center',
        valueFormatter: ({ value }) => tipoTransferenciaFormatter(value),
        headerAlign: 'center',
    },
    {
        field: 'nomeOperadorTransacao',
        headerName: 'Nome operador transacionado',
        sortable: false,
        minWidth: 300,
        align: 'center',
        headerAlign: 'center',
    },
];

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const tipoTransferenciaFormatter = function(tipoTransferencia){
    switch(tipoTransferencia){ 
        case 'DEPOSITO': return 'Depósito';
        case 'SAQUE': return 'Saque';
        case 'TRANSFERENCIA': return 'Transferência';
        default: return '';
    }
}

export default columns;