'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Loading from '../common/Loading'
import Error from '../common/error';
import Box from '@mui/material/Box';

import {columns , getSaldoTotal, isEmpty } from './TransferenciasService'

import { DataGrid } from '@mui/x-data-grid';

export default function TransferenciaPage() {

    useEffect(() => {
        fetchData();
    }, []);

    const [filterDataInicioValue, setFilterDataInicioValue] = useState('');
    const [filterDataFimValue, setFilterDataFimValue] = useState('');
    const [filterNomeOperadorTransacaoValue, setFilterNomeOperadorTransacaoValue] = useState('');
    const [filterNumeroContaValue, setfilterNumeroContaValue] = useState('');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const transferenciaPage = 'http://localhost:8080/transferencias/page'

    const handleChangeDataInicio = (event) => {
        setFilterDataInicioValue(event.target.value);
    };

    const handleChangeDataFim = (event) => {
        setFilterDataFimValue(event.target.value);
    };

    const handleChangeNomeOperadorTransacao = (event) => {
        setFilterNomeOperadorTransacaoValue(event.target.value);
    };

    const handleChangeNumeroConta = (event) => {
        setfilterNumeroContaValue(event.target.value);
    };

    const getFilter = () => {
        let params = [];

        if (!isEmpty(filterDataInicioValue)) {
            params.push("?filterDataInicio=" + moment(filterDataInicioValue).format("dd/MM/yyyy"));
        }

        if (!isEmpty(filterNumeroContaValue)) {
            params.push("?filterContaID=" + filterNumeroContaValue);
        }

        if (!isEmpty(filterDataFimValue)) {
            params.push("filterDataFim=" + moment(filterDataFimValue).format("dd/MM/yyyy"));
        }

        if (!isEmpty(filterNomeOperadorTransacaoValue)) {
            if (isEmpty(params)) { params.push("?filterNomeOperadorTransacao=" + filterNomeOperadorTransacaoValue); } else {
                params.push("filterNomeOperadorTransacao=" + filterNomeOperadorTransacaoValue);
            }
        }

        if (params.length > 0) {
            return params.join("&");
        } else {
            return "";
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(transferenciaPage + getFilter());
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

    const render = () => {
        if (data != null) {
            return (
                <div className='centered'>
                    <div className='container'>
                        <div className="row justify-content-md-center app-header">
                            <div className="col text-center">
                                <label>Data de Inicio</label><br />
                                <input type="date" value={filterDataInicioValue} onChange={handleChangeDataInicio} />
                            </div>
                            <div className="col text-center">
                                <label>Data de Fim</label> <br />
                                <input type="date" value={filterDataFimValue} onChange={handleChangeDataFim} />
                            </div>
                            <div className="col text-center">
                                <label>Nome operador transacionado</label> <br />
                                <input type="text" value={filterNomeOperadorTransacaoValue} onChange={handleChangeNomeOperadorTransacao} />
                            </div>
                            <div className="col text-center">
                                <label>Nº da conta</label> <br />
                                <input type="number" value={filterNumeroContaValue} onChange={handleChangeNumeroConta} />
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-10"></div>
                            <div className="col-2">
                                <button type='button' className="btn btn-primary btn-app" onClick={fetchData}> Pesquisar </button>
                            </div>

                        </div>

                        <div className="row default-margin"></div>
                        <div style={{ width: '100%' }}>
                            <table>
                                <tbody>
                                        {!isEmpty(filterNumeroContaValue) ?
                                        <tr>
                                            <th> 
                                            Saldo total no periodo: {getSaldoTotal(data)} 
                                            </th>  
                                        </tr> : null }                              
                                </tbody>

                            </table>
                            <Box>
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
                            </Box>
                        </div>
                    </div>
                </div>
            );
        }

        if (error != null) {
            return (
                <Error message={error} caminho={transferenciaPage} />
            );
        }

        return (
            <Loading />
        );
    }

    return render();
}