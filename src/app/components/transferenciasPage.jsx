'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import { DataGrid } from '@mui/x-data-grid';

export default function TransferenciaPage() {
    const [filterDataInicioValue, setFilterDataInicioValue] = useState('');
    const [filterDataFimValue, setFilterDataFimValue] = useState('');
    const [filterNomeOperadorTransacaoValue, setFilterNomeOperadorTransacaoValue] = useState('');

    const handleChangeDataInicio = (event) => {
        setFilterDataInicioValue(event.target.value);
      };

      const handleChangeDataFim = (event) => {
        setFilterDataFimValue(event.target.value);
      };

      const handleChangeNomeOperadorTransacao = (event) => {
        setFilterNomeOperadorTransacaoValue(event.target.value);
      };

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);



    const getFilter = () => {
        let params = [];
      
        if (filterDataInicioValue !== null && filterDataInicioValue.length > 0) {
          params.push("?filterDataInicio=" + moment(filterDataInicioValue).format("dd/MM/yyyy"));
        }
      
        if (filterDataFimValue !== null && filterDataFimValue.length > 0) {
          params.push("filterDataFim=" +  moment(filterDataFimValue).format("dd/MM/yyyy"));
        }
      
        if (filterNomeOperadorTransacaoValue !== null && filterNomeOperadorTransacaoValue.length > 0) {
            if(params.length < 1) { params.push("?filterNomeOperadorTransacao=" + filterNomeOperadorTransacaoValue);} else {
                params.push("filterNomeOperadorTransacao=" + filterNomeOperadorTransacaoValue);
            }
         
        }
      
        if (params.length > 0) {
          console.log(params.join("&"));
          return params.join("&");
        } else {
          return "";
        }
      };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/transferencias/page'+ getFilter());
            if (!response.ok) {
                throw new Error('Request failed');
            }
            const data = await response.json();
            setData(data);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const columns = [
        {
            field: 'dataTransferencia',
            headerName: 'Dados',
            width: 250,
            type: 'date',
            sortable: false,
            editable: false,
            valueGetter: (params) => new Date(params.row.dataTransferencia)
        },
        {
            field: 'valor',
            headerName: 'Valentia',
            sortable: false,
            width: 250,
            editable: false,
        },
        {
            field: 'tipoTransferencia',
            headerName: 'Tipo',
            sortable: false,
            width: 250,
            editable: false,
        },
        {
            field: 'nomeOperadorTransacao',
            headerName: 'Nome operador transacionado',
            sortable: false,
            minWidth: 300,
            cellClassName: 'text-align-center',
        },
    ];

    if (data != null) {
        return (

            <div className='centered'>
                <div className='container'>
                    <div className="row justify-content-md-center">
                        <div className="col">
                            <label>Data de Inicio</label><br />
                            <input type="date" value={filterDataInicioValue} onChange={handleChangeDataInicio}/>
                        </div>
                        <div className="col">
                            <label>Data de Fim</label> <br />
                            <input type="date" value={filterDataFimValue} onChange={handleChangeDataFim}/>
                        </div>
                        <div className="col">
                            <label>Nome operador transacionado</label>
                            <input type="text" value={filterNomeOperadorTransacaoValue} onChange={handleChangeNomeOperadorTransacao}/>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-8"></div>
                        <div className="col-4 ">
                            <button type='button' className="btn btn-primary btn-app" onClick={fetchData}> Pesquisar </button>
                        </div>

                    </div>
                    
                    <div className="row"></div>
                    <div style={{ width: '100%' }}>
                    <DataGrid
                        autoHeight {...data}
                        rows={data.content}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: data.size,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                    </div>
                    

                </div>
            </div>
        );
    }

}