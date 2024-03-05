import json
import pymysql
import pandas as pd 
import json
from datetime import datetime
from sqlalchemy import create_engine
import requests

def lambda_handler(event, context):
    '''event={'body': {'placa': '', 'cidade': ['Novo_Hamburgo'], 'ponto': ['_all_'], 'endereco': ['_all_'],
            'marca': [4388],'modelo': [4476], 'cor': [7725], 
            'municipio': [7741], 'situacao': [8791], 'uf': [8793], 
            'tipoVeiculo': [8820], 'startDate': '2024/01/28 22:04:16', 'endDate': '2024/01/28 22:04:16'}}'''
    
    def conexao_banco(event):
        host='cpsinos-producao.cluster-czkksju62uyd.sa-east-1.rds.amazonaws.com'
        user='admin' 
        port=35689 
        password='vhHxG5ou2J8zm5lrPGu2'
        database='cpsinos'
    
        class MySQLDatabase:
            def __init__(self, host, user, port, password, database):
                self.host = host
                self.user = user
                self.port = port
                self.password = password
                self.database = database
                self.create_engine = self.create_db_engine()
                self.conn = None
                self.cursor = None
    
            def create_db_engine(self):
                return create_engine(f'mysql+mysqlconnector://{self.user}:{self.password}@{self.host}:{self.port}/{self.database}')
    
            def connect(self):
                self.conn = pymysql.connect(host=self.host, user=self.user, port=self.port, password=self.password, database=self.database)
                self.cursor = self.conn.cursor()
    
            def disconnect(self):
                if self.create_engine:
                    self.create_engine.dispose()
                if self.conn:
                    self.conn.close()
                if self.cursor:
                    self.cursor.close()
    
            def is_connected(self):
                return self.conn is not None and self.conn.open
    
            def get_connection(self):
                return self.conn
    
            def get_cursor(self):
                return self.cursor
    
            def get_host(self):
                return self.host
            
        instancia_api_placa = MySQLDatabase(host=host, user=user, port=port, password=password, database=database)
        banco_status_gravacao="Conexão banco gravação"
        conectar_api_placa=instancia_api_placa.connect()
        conexao_api_placa= instancia_api_placa.get_connection()
        cursor_api_placa=instancia_api_placa.get_cursor()
        engine_api_placa =instancia_api_placa.create_engine
    
        def evento_recebido_tratado(event):
            
        
            try:
                json_data = event["body"]#funciona
                event = json.loads(json_data)
            except Exception as e:
                event=event
                
            #items_dat=pd.Dataframe(items_data)
    
            def convert_to_tuples(data):
                if isinstance(data, list):
                    return tuple(convert_to_tuples(item) for item in data)
                elif isinstance(data, dict):
                    return {key: convert_to_tuples(value) for key, value in data.items()}
                else:
                    return data
    
            event = convert_to_tuples(event)
    
            start_date_str = event['body']["startDate"]
            end_date_str = event['body']["endDate"]
    
            # Convertendo as strings para objetos datetime
            start_date = datetime.strptime(start_date_str, '%Y/%m/%d %H:%M:%S')
            end_date = datetime.strptime(end_date_str, '%Y/%m/%d %H:%M:%S')
    
            # Convertendo as datas para o formato do MySQL
            start_date_mysql = start_date.strftime('%Y-%m-%d %H:%M:%S')
            end_date_mysql = end_date.strftime('%Y-%m-%d %H:%M:%S')
    
            placa_consulta=event['body']["placa"]
    
            cidade_body=event['body']["cidade"]
            cidade, vali_cidade = ('_all_', '_all_') if "_all_" in cidade_body else (cidade_body, '')
            if len(cidade) == 1 or cidade == "_all_":
                if cidade == "_all_":
                    cidade=f"('{cidade}')"
                elif len(cidade) == 1:
                    cidade = f"('{cidade[0]}')"
            else:
                cidade = str(cidade)
    
            ponto_body=event['body']["ponto"]
            ponto, vali_ponto = ('_all_', '_all_') if "_all_" in ponto_body else (ponto_body, '')
            if len(ponto) == 1 or ponto == "_all_":
                if ponto == "_all_":
                    ponto=f"('{ponto}')"
                elif len(ponto) == 1:
                    ponto = f"('{ponto[0]}')"
            else:
                ponto = str(ponto)
            ''' AND ('_all_' = '_all_' OR tp.name = '_all_' OR tp.name IN ('_all_')) '''
    
            endereco_body=event['body']["endereco"]
            endereco, endereco_cidade = ('_all_', '_all_') if "_all_" in endereco_body else (endereco_body, '')
            #endereco = f"('{endereco[0]}')" if len(endereco) == 1 else str(endereco)
            if len(endereco) == 1 or endereco == "_all_":
                if endereco == "_all_":
                    endereco=f"('{endereco}')"
                elif len(endereco) == 1:
                    endereco = f"('{endereco[0]}')"
            else:
                endereco = str(endereco)
    
    
            marca_body=event['body']["marca"]
            marca, vali_marca = ('_all_', '_all_') if "_all_" in marca_body else (marca_body, '')
            #marca = f"({marca[0]})" if len(marca) == 1 else str(marca)
            if len(marca) == 1 or marca == "_all_":
                if marca == "_all_":
                    marca=f"('{marca}')"
                elif len(marca) == 1:
                    marca = f"('{marca[0]}')"
            else:
                marca = str(marca)
    
            modelo_body=event['body']["modelo"]
            modelo, vali_modelo = ('_all_', '_all_') if "_all_" in modelo_body else (modelo_body, '')
            #modelo = f"({modelo[0]})" if len(modelo) == 1 else str(modelo)
            if len(modelo) == 1 or modelo == "_all_":
                if modelo == "_all_":
                    modelo=f"('{modelo}')"
                elif len(modelo) == 1:
                    modelo = f"('{modelo[0]}')"
            else:
                modelo = str(modelo)
    
            cor_body=event['body']["cor"]
            cor, vali_cor = ('_all_', '_all_') if "_all_" in cor_body else (cor_body, '')
            #cor = f"({cor[0]})" if len(cor) == 1 else str(cor)
            if len(cor) == 1 or cor == "_all_":
                if cor == "_all_":
                    cor=f"('{cor}')"
                elif len(cor) == 1:
                    cor = f"('{cor[0]}')"
            else:
                cor = str(cor)
    
            municipio_body=event['body']["municipio"]
            municipio, vali_municipio = ('_all_', '_all_') if "_all_" in municipio_body else (municipio_body, '')
            #municipio = f"({municipio[0]})" if len(municipio) == 1 else str(municipio)
            if len(municipio) == 1 or municipio == "_all_":
                if municipio == "_all_":
                    municipio=f"('{municipio}')"
                elif len(municipio) == 1:
                    municipio = f"('{municipio[0]}')"
            else:
                municipio = str(municipio)
    
            situacao_body=event['body']["situacao"]
            situacao, vali_situacao = ('_all_', '_all_') if "_all_" in situacao_body else (situacao_body, '')
            #situacao = f"({situacao[0]})" if len(situacao) == 1 else str(situacao)
            if len(situacao) == 1 or situacao == "_all_":
                if situacao == "_all_":
                    situacao=f"('{situacao}')"
                elif len(situacao) == 1:
                    situacao = f"('{situacao[0]}')"
            else:
                situacao = str(situacao)
    
            uf_body=event['body']["uf"]
            uf, vali_uf = ('_all_', '_all_') if "_all_" in uf_body else (uf_body, '')
            #uf = f"({uf[0]})" if len(uf) == 1 else str(uf)
            if len(uf) == 1 or uf == "_all_":
                if uf == "_all_":
                    uf=f"('{uf}')"
                elif len(uf) == 1:
                    uf = f"('{uf[0]}')"
            else:
                uf = str(uf)
    
            tipoVeiculo_body=event['body']["tipoVeiculo"]
            tipoVeiculo, vali_tipoVeiculo = ('_all_', '_all_') if "_all_" in tipoVeiculo_body else (tipoVeiculo_body, '')
            #tipoVeiculo = f"({tipoVeiculo[0]})" if len(tipoVeiculo) == 1 else str(tipoVeiculo)
            if len(tipoVeiculo) == 1 or tipoVeiculo == "_all_":
                if tipoVeiculo == "_all_":
                    tipoVeiculo=f"('{tipoVeiculo}')"
                elif len(tipoVeiculo) == 1:
                    tipoVeiculo = f"('{tipoVeiculo[0]}')"
            else:
                tipoVeiculo = str(tipoVeiculo)
         
            def query_result():
                query = f"""
                    SELECT
                        eag.id,
                        eag.tc_point_read_id,
                        eag.url,
                        eag.plate,
                        eag.data_captura,
                        tM.title        as idMarca,
                        tModelo.title   as idModelo,
                        tCor.title      as idCor,
                        tMuni.title    	as idMunicipio,
                        tSitu.title     as idSituacao,
                        tUF.title       as idUF,
                        tTipoVei.title 	as idTipoVeiculo,
                        tpr.tc_point_id,
                        tpr.address,
                        tpr.Direcao,
                        tpr.Camera,
                        tp.name as Ponto,
                        tp.tc_central_id,
                        tc.name as Cidade,
                        tc.sigla,
                        tc.cnpj
                    FROM
                        Safeway_Api_placas_cadastro eag 
                    LEFT JOIN
                        tc_point_reader tpr ON eag.tc_point_read_id  = tpr.id
                    LEFT JOIN
                        tc_point tp ON tpr.tc_point_id = tp.id
                    LEFT JOIN
                        tc_central tc ON tp.tc_central_id = tc.id
                    LEFT JOIN 
                    	Safeway_Api_placas_tipo tM on eag.marca = tM.id
                    LEFT JOIN 
                    	Safeway_Api_placas_tipo tModelo on eag.modelo  = tModelo.id
                    LEFT JOIN 
                    	Safeway_Api_placas_tipo tCor on eag.cor  = tCor.id
                    LEFT JOIN 
                    	Safeway_Api_placas_tipo tMuni on eag.municipio = tMuni.id
                    LEFT JOIN 
                    	Safeway_Api_placas_tipo tSitu on eag.situacao = tSitu.id
                    LEFT JOIN 
                    	Safeway_Api_placas_tipo tUF on eag.uf = tUF.id
                    LEFT JOIN 
                    	Safeway_Api_placas_tipo tTipoVei on eag.tipo_veiculo  = tTipoVei.id
                    WHERE
                        eag.data_captura BETWEEN '{start_date_mysql}' AND '{end_date_mysql}'
                        AND (eag.plate LIKE CONCAT('%', '{placa_consulta}', '%') OR '{placa_consulta}' = '')
                        AND ('{vali_marca}' = '_all_' OR eag.marca IN {marca})
                        AND ('{vali_modelo}' = '_all_' OR eag.modelo IN {modelo})
                        AND ('{vali_cor}' = '_all_' OR eag.cor IN {cor})
                        AND ('{vali_municipio}'= '_all_' OR eag.municipio IN {municipio})
                        AND ('{vali_situacao}' = '_all_' OR eag.situacao IN {situacao})
                        AND ('{vali_uf}' = '_all_' OR eag.uf IN {uf})
                        AND ('{vali_tipoVeiculo}' = '_all_' OR eag.tipo_veiculo IN {tipoVeiculo})
                        AND ('{cidade}' = '_all_' OR  tc.name = '_all_' OR  tc.name IN {cidade})
                        AND ('{ponto}' = '_all_' OR tp.name = '_all_' OR tp.name IN {ponto})
                        AND ('{endereco}' = '_all_' OR tpr.address = '_all_' OR tpr.address IN {endereco})
                        
                    ORDER BY
                        eag.data_captura DESC
                    LIMIT 50;
                """
                df = pd.read_sql(query, con=engine_api_placa)
                # Converte o DataFrame para JSON
                json_data = df.to_json(orient='records')
    
                return json_data
            retorno=query_result()
            return retorno
        retorno_cliente=evento_recebido_tratado(event)
        return retorno_cliente
    retorno_cliente_final=conexao_banco(event)
    
    return  retorno_cliente_final
