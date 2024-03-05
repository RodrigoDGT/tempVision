WITH filtered_eag AS (
    SELECT *
    FROM Safeway_Api_placas_cadastro
    WHERE data_captura BETWEEN '{start_date_mysql}' AND '{end_date_mysql}'
    AND (plate LIKE CONCAT('%', '{placa_consulta}', '%') OR '{placa_consulta}' = '')
    AND ('{vali_marca}' = '_all_' OR marca IN {marca})
    AND ('{vali_modelo}' = '_all_' OR modelo IN {modelo})
    AND ('{vali_cor}' = '_all_' OR cor IN {cor})
    AND ('{vali_municipio}'= '_all_' OR municipio IN {municipio})
    AND ('{vali_situacao}' = '_all_' OR situacao IN {situacao})
    AND ('{vali_uf}' = '_all_' OR uf IN {uf})
    AND ('{vali_tipoVeiculo}' = '_all_' OR tipo_veiculo IN {tipoVeiculo})
)
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
    filtered_eag eag 
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
    ('{vali_cidade}' = '_all_' OR tc.id IN {cidade})
    AND ('{vali_ponto}' = '_all_' OR FIND_IN_SET(tp.name, '{ponto}') > 0)
    AND ('{endereco_cidade}' = '_all_' OR tpr.address IN {endereco})
ORDER BY
    eag.data_captura DESC
LIMIT 50;





WITH filtered_eag AS (
    SELECT *
    FROM Safeway_Api_placas_cadastro
    WHERE data_captura BETWEEN '2024/02/13 00:00:00' AND '2024/02/13 23:59:59'
    AND (plate LIKE CONCAT('%', '', '%') OR '' = '')
    AND ('_all_' = '_all_' OR marca IN (0)))
    AND ('_all_' = '_all_' OR modelo IN (0))
    AND ('_all_' = '_all_' OR cor IN (0))
    AND ('_all_'= '_all_' OR municipio IN (0))
    AND ('_all_' = '_all_' OR situacao IN (0))
    AND ('_all_' = '_all_' OR uf IN (0))
    AND ('_all_' = '_all_' OR tipo_veiculo IN (0))
)
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
    filtered_eag eag 
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
    ('_all_' = '_all_' OR tc.id IN (0))
    AND ('_all_' = '_all_' OR FIND_IN_SET(tp.name, '{ponto}') > 0)
    AND ('_all_' = '_all_' OR tpr.address IN (1))
ORDER BY
    eag.data_captura DESC
LIMIT 50;