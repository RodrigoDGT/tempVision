require.config({
    paths: {
        'bootstrap': 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle',
    }
});

var _dateTime = { //Date Tools
    optionsDate: {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    },
    optionsTime: {
        hour: '2-digit',
        minute: '2-digit'
    },
    optionsTimeFull: {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    },
    optionsFull: {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    },
    formatToBootrstrap: function(dateString) {
        let date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', this.optionsDate).split('/').reverse().join('-') + 'T' + date.toLocaleTimeString('pt-BR', this.optionsTime);
    },
    stringToDateAsHoursBR: function(dateString) {
        let date = new Date(dateString);
        let isoString = date.toISOString();
        let datePart = isoString.slice(0, 10);
        datePart = datePart.split('-').reverse().join('/');
        let timePart = isoString.slice(11, 16);
        return datePart + ' às ' + timePart;
    },
    stringToDateHoursBR: function(dateString) {
        let date = new Date(dateString);
        date = date.toLocaleDateString('pt-BR', this.optionsDate) + ' ' + date.toLocaleTimeString('pt-BR', this.optionsTime);
        return date;
    },
    stringToDateHoursUS: function(dateString) {
        let date = new Date(dateString);
        date = date.toLocaleDateString('en-CA', this.optionsDate) + ' ' + date.toLocaleTimeString('pt-BR', this.optionsTimeFull);
        return date;
    },
    convertTimesTamp: function(dateString) {
        let date = new Date(dateString);
        isoString = date.toISOString();
        isoString = isoString.split('-').join('/');
        return isoString.slice(0,10).split('/').reverse().join('/') + " às " + isoString.slice(11,16);
    },
    stringToDateHoursIntl: function(dateString) {
        // Convertendo a string de data e hora para um objeto Date
        let [day, month, yearTime] = dateString.split('/');
        let [year, time] = yearTime.split(' às ');
        let date = new Date(`${month}/${day}/${year} ${time}`);
    
        // Retornando a data e hora no formato internacional
        return date.toISOString().replace('T', ' ').substring(0, 16);
    },
    stringDateDDMMYYYY: function(dateString) {
        let date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', this.optionsDate);
    },
}
const enumToast = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};
const envAlertas = {
    token: '5tCLdR7cAk5hW491VGqaq6VxVVubbxBF4psn23X1',
    URL: 'https://b9qc7z5jbf.execute-api.sa-east-1.amazonaws.com/v1/alerta', //PUT, POST, DELETE
}
var _bootstrap = null; // Framework Bootstrap
var _alertList = []; // Identificar se houve alteração nos valores
var _lastRequest = null; // Ultima requisição
var _modalAlertas = null; // Modal de alertas
var _user = {
    alertEnabled: false,
    city: null,
    product: null,
    email: null
}

var a = "[\n  {\n    \"ID\": 5092,\n    \"url\": \"192_168_28_128_24022024_160316_1_APD1567.jpg\",\n    \"plate\": \"APD1567\",\n    \"data_captura\": 1708790596000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C18\",\n    \"address\": \"Avenida V\\u00edtor Hugo Kunz 3077\",\n    \"Direcao\": \"CB->NH\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 150 TITAN ES\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2007\",\n    \"id_anoModelo\": \"2008\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Curitiba\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"PR\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5091,\n    \"url\": \"192_168_29_17_24022024_143946_2_LHR6657.jpg\",\n    \"plate\": \"LHR6657\",\n    \"data_captura\": 1708785586000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C7\",\n    \"address\": \"Rua Jo\\u00e3o Aloysio Algayer 7590, Lomba Grande - 93490-000 Novo Hamburgo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL GL\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1990\",\n    \"id_anoModelo\": \"1990\",\n    \"id_cor\": \"CINZA\",\n    \"id_municipio\": \"Rio de Janeiro\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5041,\n    \"url\": \"192_168_29_123_24022024_053552_2_IFP5B63.jpg\",\n    \"plate\": \"IFP5B63\",\n    \"data_captura\": 1708752952000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C13\",\n    \"address\": \"Avenida Jo\\u00e3o Corr\\u00eaa 1999, S\\u00e3o Miguel - 93025-510 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CBX 200 STRADA\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1996\",\n    \"id_anoModelo\": \"1997\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Sant'Ana do Livramento\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4983,\n    \"url\": \"192_168_29_17_23022024_212731_1_DDB5118.jpg\",\n    \"plate\": \"DDB5118\",\n    \"data_captura\": 1708723651000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C7\",\n    \"address\": \"Rua Jo\\u00e3o Aloysio Algayer 7590, Lomba Grande - 93490-000 Novo Hamburgo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"TOYOTA\",\n    \"id_modelo\": \"COROLLA XEI\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2000\",\n    \"id_anoModelo\": \"2001\",\n    \"id_cor\": \"VERDE\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4984,\n    \"url\": \"192_168_29_20_23022024_210657_1_IPH7547.jpg\",\n    \"plate\": \"IPH7547\",\n    \"data_captura\": 1708722417000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C10\",\n    \"address\": \"Rua Santa Catarina 80, Scharlau - 93120-010 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 150 TITAN KS\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2008\",\n    \"id_anoModelo\": \"2008\",\n    \"id_cor\": \"AZUL\",\n    \"id_municipio\": \"Alvorada\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4979,\n    \"url\": \"192_168_29_37_23022024_210252_1_IFY7G20.jpg\",\n    \"plate\": \"IFY7G20\",\n    \"data_captura\": 1708722172000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C27\",\n    \"address\": \"Avenida Unisinos 950, Cristo Rei S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL MI\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1997\",\n    \"id_anoModelo\": \"1997\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Porto Alegre\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4986,\n    \"url\": \"192_168_29_13_23022024_192517_1_IUT6I44.jpg\",\n    \"plate\": \"IUT6I44\",\n    \"data_captura\": 1708716317000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C3\",\n    \"address\": \"Avenida Mau\\u00e1 4456, Centro - 93218-270 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL 1.0 GIV\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2013\",\n    \"id_anoModelo\": \"2014\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Porto Alegre\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4970,\n    \"url\": \"192.168.33.121_23022024_175805_693680469_JGJ7C25.jpg\",\n    \"plate\": \"JGJ7C25\",\n    \"data_captura\": 1708711085000,\n    \"cnpj\": 88254891000153,\n    \"Cidade\": \"Dois_Irmaos\",\n    \"Ponto\": \"Ponto_C9\",\n    \"address\": \"RUA WALTER SCHECK\",\n    \"Direcao\": \"Bairro/Centro\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"GM\",\n    \"id_modelo\": \"CORSA HATCH\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2004\",\n    \"id_anoModelo\": \"2004\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Bras\\u00edlia\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"DF\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4971,\n    \"url\": \"192_168_33_114_23022024_175343_1_ACC8141.jpg\",\n    \"plate\": \"ACC8141\",\n    \"data_captura\": 1708710823000,\n    \"cnpj\": 88254891000153,\n    \"Cidade\": \"Dois_Irmaos\",\n    \"Ponto\": \"Ponto_C4\",\n    \"address\": \"Rua Alberto Rubenich 7715, Floresta Dois Irm\\u00e3os / BR\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"XL 250 R\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1982\",\n    \"id_anoModelo\": \"1982\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Londrina\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"PR\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4968,\n    \"url\": \"192_168_29_27_23022024_161428_1_IJP3377.jpg\",\n    \"plate\": \"IJP3377\",\n    \"data_captura\": 1708704868000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C17\",\n    \"address\": \"Avenida Henrique Bier 2635, Campina - 93135-000 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FIAT\",\n    \"id_modelo\": \"UNO MILLE SMART\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2000\",\n    \"id_anoModelo\": \"2001\",\n    \"id_cor\": \"CINZA\",\n    \"id_municipio\": \"Porto Alegre\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4966,\n    \"url\": \"192_168_29_15_23022024_154719_1_LQO4036.jpg\",\n    \"plate\": \"LQO4036\",\n    \"data_captura\": 1708703239000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C5\",\n    \"address\": \"Avenida Caxias do Sul 1069, sao leopoldo - 93110-000 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 125 FAN KS\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2012\",\n    \"id_anoModelo\": \"2013\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"Araruama\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4958,\n    \"url\": \"192_168_29_27_23022024_145604_1_DCI0418.jpg\",\n    \"plate\": \"DCI0418\",\n    \"data_captura\": 1708700164000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C17\",\n    \"address\": \"Avenida Henrique Bier 2635, Campina - 93135-000 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 125 TITAN ES\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2000\",\n    \"id_anoModelo\": \"2001\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"S\\u00e3o Vicente\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4953,\n    \"url\": \"192_168_29_19_23022024_145159_2_IAH7870.jpg\",\n    \"plate\": \"IAH7870\",\n    \"data_captura\": 1708699919000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C9\",\n    \"address\": \"Avenida S\\u00e3o Borja 719, Rio Branco - 93040-588 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FIAT\",\n    \"id_modelo\": \"UNO MILLE FIRE FLEX\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2007\",\n    \"id_anoModelo\": \"2008\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Tobias Barreto\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SE\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4949,\n    \"url\": \"192_168_33_114_23022024_143623_2_IFZ9031.jpg\",\n    \"plate\": \"IFZ9031\",\n    \"data_captura\": 1708698983000,\n    \"cnpj\": 88254891000153,\n    \"Cidade\": \"Dois_Irmaos\",\n    \"Ponto\": \"Ponto_C4\",\n    \"address\": \"Rua Alberto Rubenich 7715, Floresta Dois Irm\\u00e3os / BR\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"GM\",\n    \"id_modelo\": \"CORSA WIND\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1997\",\n    \"id_anoModelo\": \"1997\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"S\\u00e3o Leopoldo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4944,\n    \"url\": \"192_168_29_123_23022024_135545_1_CED2578.jpg\",\n    \"plate\": \"CED2578\",\n    \"data_captura\": 1708696545000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C13\",\n    \"address\": \"Avenida Jo\\u00e3o Corr\\u00eaa 1999, S\\u00e3o Miguel - 93025-510 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"FUSCA 1600 S\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1975\",\n    \"id_anoModelo\": \"1976\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4942,\n    \"url\": \"192_168_29_28_23022024_134419_1_AKI1484.jpg\",\n    \"plate\": \"AKI1484\",\n    \"data_captura\": 1708695859000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C18\",\n    \"address\": \"Av. Henrique Bier, 60 - Poste em frente ao n\\u00b0 103. Vias de ida e volta - 93130-000 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CBX 250 TWISTER\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2002\",\n    \"id_anoModelo\": \"2002\",\n    \"id_cor\": \"AZUL\",\n    \"id_municipio\": \"Camb\\u00e9\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"PR\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4936,\n    \"url\": \"192_168_29_123_23022024_123438_1_BRR0068.jpg\",\n    \"plate\": \"BRR0068\",\n    \"data_captura\": 1708691678000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C13\",\n    \"address\": \"Avenida Jo\\u00e3o Corr\\u00eaa 1999, S\\u00e3o Miguel - 93025-510 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"JTA\",\n    \"id_modelo\": \"SUZUKI GSXR1100\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1995\",\n    \"id_anoModelo\": \"1995\",\n    \"id_cor\": \"ROXA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4937,\n    \"url\": \"192_168_29_123_23022024_123248_1_IWF3G00.jpg\",\n    \"plate\": \"IWF3G00\",\n    \"data_captura\": 1708691568000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C13\",\n    \"address\": \"Avenida Jo\\u00e3o Corr\\u00eaa 1999, S\\u00e3o Miguel - 93025-510 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"TOYOTA\",\n    \"id_modelo\": \"ETIOS SD X\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2014\",\n    \"id_anoModelo\": \"2015\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Viam\\u00e3o\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4938,\n    \"url\": \"192_168_29_123_23022024_123248_1_IWF3G00.jpg\",\n    \"plate\": \"IWF3G00\",\n    \"data_captura\": 1708691568000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C13\",\n    \"address\": \"Avenida Jo\\u00e3o Corr\\u00eaa 1999, S\\u00e3o Miguel - 93025-510 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"TOYOTA\",\n    \"id_modelo\": \"ETIOS SD X\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2014\",\n    \"id_anoModelo\": \"2015\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Viam\\u00e3o\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4934,\n    \"url\": \"192_168_28_115_23022024_121210_1_LLV5863.jpg\",\n    \"plate\": \"LLV5863\",\n    \"data_captura\": 1708690330000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C5\",\n    \"address\": \"Rua Jos\\u00e9 de Alencar x BR116\",\n    \"Direcao\": \"BR116->NH\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CB 300R\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2013\",\n    \"id_anoModelo\": \"2013\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Maric\\u00e1\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4933,\n    \"url\": \"192_168_29_128_23022024_120846_1_FBY7689.jpg\",\n    \"plate\": \"FBY7689\",\n    \"data_captura\": 1708690126000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C18\",\n    \"address\": \"Av. Henrique Bier, 60 - Poste em frente ao n\\u00b0 103. Vias de ida e volta - 93130-000 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 160 FAN ESDI\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2017\",\n    \"id_anoModelo\": \"2017\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Iper\\u00f3\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4932,\n    \"url\": \"192_168_28_28_23022024_120405_2_IZK5691.jpg\",\n    \"plate\": \"IZK5691\",\n    \"data_captura\": 1708689845000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C18\",\n    \"address\": \"Avenida V\\u00edtor Hugo Kunz 3077\",\n    \"Direcao\": \"CB->NH\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FIAT\",\n    \"id_modelo\": \"FIORINO HD WK E\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2019\",\n    \"id_anoModelo\": \"2020\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Almirante Tamandar\\u00e9\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"PR\",\n    \"id_tipo_veiculo\": \"Caminhonete\",\n    \"id_segmento\": \"Comercial Leve\"\n  },\n  {\n    \"ID\": 5006,\n    \"url\": \"192_168_28_123_23022024_120114_1_KMH3078.jpg\",\n    \"plate\": \"KMH3078\",\n    \"data_captura\": 1708689674000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C13\",\n    \"address\": \"Rua Rinc\\u00e3o x BR116 (Oeste)\",\n    \"Direcao\": \"BR116->Boa S.\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"M.BENZ\",\n    \"id_modelo\": \"LK 1618\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1996\",\n    \"id_anoModelo\": \"1996\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Nova Friburgo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Caminhao\",\n    \"id_segmento\": \"Caminhao\"\n  },\n  {\n    \"ID\": 4931,\n    \"url\": \"192_168_29_42_23022024_115210_1_LAO0800.jpg\",\n    \"plate\": \"LAO0800\",\n    \"data_captura\": 1708689130000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C32\",\n    \"address\": \"Avenida Henrique Bier 1251, Campina S\\u00e3o Leopoldo / BR\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"IMP\",\n    \"id_modelo\": \"CITROEN XANTIA 2.0I\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1994\",\n    \"id_anoModelo\": \"1995\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Engenheiro Paulo de Frontin\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4928,\n    \"url\": \"192_168_28_22_23022024_114758_1_JBE2008.jpg\",\n    \"plate\": \"JBE2008\",\n    \"data_captura\": 1708688878000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C12\",\n    \"address\": \"R Rinc\\u00e3o x BR116\",\n    \"Direcao\": \"Bairro->Centro\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOLF 1.6 SPORTLINE\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2007\",\n    \"id_anoModelo\": \"2008\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Novo Hamburgo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4926,\n    \"url\": \"192_168_28_20_23022024_114622_2_IOO0117.jpg\",\n    \"plate\": \"IOO0117\",\n    \"data_captura\": 1708688782000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C10\",\n    \"address\": \"BR-116 3205 x Rinc\\u00e3o dos Ilh\\u00e9us\",\n    \"Direcao\": \"BR116->NH\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 150 TITAN ES\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2008\",\n    \"id_anoModelo\": \"2008\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"Gravata\\u00ed\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4929,\n    \"url\": \"192_168_28_18_23022024_114333_2_IGD9158.jpg\",\n    \"plate\": \"IGD9158\",\n    \"data_captura\": 1708688613000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C8\",\n    \"address\": \"Rua 24 de Maio x BR116\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"YAMAHA\",\n    \"id_modelo\": \"RD 350\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1991\",\n    \"id_anoModelo\": \"1991\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"Garibaldi\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4925,\n    \"url\": \"192_168_29_37_23022024_113439_1_LMT0041.jpg\",\n    \"plate\": \"LMT0041\",\n    \"data_captura\": 1708688079000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C27\",\n    \"address\": \"Avenida Unisinos 950, Cristo Rei S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL 1.0\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2000\",\n    \"id_anoModelo\": \"2001\",\n    \"id_cor\": \"AZUL\",\n    \"id_municipio\": \"Queimados\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4924,\n    \"url\": \"192_168_29_127_23022024_113049_1_CJS8301.jpg\",\n    \"plate\": \"CJS8301\",\n    \"data_captura\": 1708687849000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C17\",\n    \"address\": \"Avenida Henrique Bier 2635, Campina - 93135-000 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"GM\",\n    \"id_modelo\": \"KADETT GL\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1997\",\n    \"id_anoModelo\": \"1997\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Rio de Janeiro\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5009,\n    \"url\": \"192_168_28_127_23022024_112758_2_AII1111.jpg\",\n    \"plate\": \"AII1111\",\n    \"data_captura\": 1708687678000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C17\",\n    \"address\": \"Rua Engenheiro Jorge Schury 1473\",\n    \"Direcao\": \"Sa\\u00edda C. Bom\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CB 450 DX\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1988\",\n    \"id_anoModelo\": \"1988\",\n    \"id_cor\": \"CINZA\",\n    \"id_municipio\": \"Curitiba\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"PR\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4923,\n    \"url\": \"192_168_28_128_23022024_110547_1_ILJ0061.jpg\",\n    \"plate\": \"ILJ0061\",\n    \"data_captura\": 1708686347000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C18\",\n    \"address\": \"Avenida V\\u00edtor Hugo Kunz 3077\",\n    \"Direcao\": \"CB->NH\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CBX 250 TWISTER\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2003\",\n    \"id_anoModelo\": \"2003\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"Santo \\u00c2ngelo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5012,\n    \"url\": \"192_168_28_29_23022024_105254_1_DDC0010.jpg\",\n    \"plate\": \"DDC0010\",\n    \"data_captura\": 1708685574000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C19\",\n    \"address\": \"Av. Vitor hugo Kunz x Rua \\u00cdcaro\",\n    \"Direcao\": \"NH->CB\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL 16V PLUS\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2000\",\n    \"id_anoModelo\": \"2001\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4922,\n    \"url\": \"192_168_28_28_23022024_105242_1_LZO3301.jpg\",\n    \"plate\": \"LZO3301\",\n    \"data_captura\": 1708685562000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C18\",\n    \"address\": \"Avenida V\\u00edtor Hugo Kunz 3077\",\n    \"Direcao\": \"CB->NH\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL 16V\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1998\",\n    \"id_anoModelo\": \"1998\",\n    \"id_cor\": \"CINZA\",\n    \"id_municipio\": \"Joinville\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SC\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4915,\n    \"url\": \"192_168_28_28_23022024_105242_1_LZO3301.jpg\",\n    \"plate\": \"LZO3301\",\n    \"data_captura\": 1708685562000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C18\",\n    \"address\": \"Avenida V\\u00edtor Hugo Kunz 3077\",\n    \"Direcao\": \"CB->NH\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL 16V\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1998\",\n    \"id_anoModelo\": \"1998\",\n    \"id_cor\": \"CINZA\",\n    \"id_municipio\": \"Joinville\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SC\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4914,\n    \"url\": \"192_168_29_127_23022024_103442_2_LJC7007.jpg\",\n    \"plate\": \"LJC7007\",\n    \"data_captura\": 1708684482000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C17\",\n    \"address\": \"Avenida Henrique Bier 2635, Campina - 93135-000 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FORD\",\n    \"id_modelo\": \"ESCORT XR3\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1987\",\n    \"id_anoModelo\": \"1987\",\n    \"id_cor\": \"CINZA\",\n    \"id_municipio\": \"Rio de Janeiro\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4913,\n    \"url\": \"192_168_28_132_23022024_102519_1_LIW6414.jpg\",\n    \"plate\": \"LIW6414\",\n    \"data_captura\": 1708683919000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C22\",\n    \"address\": \"Avenida dos Munic\\u00edpios 7380\",\n    \"Direcao\": \"NH->CB\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"GM\",\n    \"id_modelo\": \"CARAVAN COMODORO SL\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1991\",\n    \"id_anoModelo\": \"1992\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"Rio de Janeiro\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5016,\n    \"url\": \"192_168_29_131_23022024_102141_1_IIU9175.jpg\",\n    \"plate\": \"IIU9175\",\n    \"data_captura\": 1708683701000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C21\",\n    \"address\": \"Avenida Feitoria 3290, Feitoria S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FIAT\",\n    \"id_modelo\": \"UNO MILLE EX\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1999\",\n    \"id_anoModelo\": \"1999\",\n    \"id_cor\": \"CINZA\",\n    \"id_municipio\": \"Carazinho\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5018,\n    \"url\": \"192_168_28_111_23022024_101854_2_EIF8F23.jpg\",\n    \"plate\": \"EIF8F23\",\n    \"data_captura\": 1708683534000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C1\",\n    \"address\": \"BR116 x Av 7 Setembro\",\n    \"Direcao\": \"BR116->NH\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"PEUGEOT\",\n    \"id_modelo\": \"207HB XR S\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2009\",\n    \"id_anoModelo\": \"2010\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Jundia\\u00ed\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4912,\n    \"url\": \"192_168_28_128_23022024_101715_2_CGV5847.jpg\",\n    \"plate\": \"CGV5847\",\n    \"data_captura\": 1708683435000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C18\",\n    \"address\": \"Avenida V\\u00edtor Hugo Kunz 3077\",\n    \"Direcao\": \"CB->NH\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL CLI\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1996\",\n    \"id_anoModelo\": \"1996\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Barueri\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4911,\n    \"url\": \"192_168_28_34_23022024_101312_1_IBI8436.jpg\",\n    \"plate\": \"IBI8436\",\n    \"data_captura\": 1708683192000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C24\",\n    \"address\": \"Rua Jos\\u00e9 do Patroc\\u00ednio\",\n    \"Direcao\": \"Sa\\u00edda BR116\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"PARATI GL 1.8\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1994\",\n    \"id_anoModelo\": \"1994\",\n    \"id_cor\": \"CINZA\",\n    \"id_municipio\": \"Porto Alegre\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4910,\n    \"url\": \"192_168_28_119_23022024_100311_1_IID5648.jpg\",\n    \"plate\": \"IID5648\",\n    \"data_captura\": 1708682591000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C9\",\n    \"address\": \"Rua Rinc\\u00e3o x BR116 (Leste) 3205\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL CL\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1988\",\n    \"id_anoModelo\": \"1989\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4909,\n    \"url\": \"192_168_28_31_23022024_095310_1_LWC8823.jpg\",\n    \"plate\": \"LWC8823\",\n    \"data_captura\": 1708681990000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C21\",\n    \"address\": \"Rua Primeiro de Mar\\u00e7o 5045 (Est Santo Afonso)\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 125 TITAN KS\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2000\",\n    \"id_anoModelo\": \"2000\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Teresina\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"PI\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4907,\n    \"url\": \"192_168_29_121_23022024_093723_1_CED2571.jpg\",\n    \"plate\": \"CED2571\",\n    \"data_captura\": 1708681043000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C11\",\n    \"address\": \"Avenida Jo\\u00e3o Corr\\u00eaa 1836, Vicentina - 93020-190 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL CLI 1.8\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1996\",\n    \"id_anoModelo\": \"1996\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4908,\n    \"url\": \"192_168_29_123_23022024_093621_1_CED2578.jpg\",\n    \"plate\": \"CED2578\",\n    \"data_captura\": 1708680981000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C13\",\n    \"address\": \"Avenida Jo\\u00e3o Corr\\u00eaa 1999, S\\u00e3o Miguel - 93025-510 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"FUSCA 1600 S\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1975\",\n    \"id_anoModelo\": \"1976\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4906,\n    \"url\": \"192_168_28_38_23022024_093245_1_GBG2805.jpg\",\n    \"plate\": \"GBG2805\",\n    \"data_captura\": 1708680765000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C28\",\n    \"address\": \"NH 28 - R Guia Lopes x Porto Seco\",\n    \"Direcao\": \"Leste->Canudos\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"GM\",\n    \"id_modelo\": \"S10 ADVANTAGE D\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2009\",\n    \"id_anoModelo\": \"2009\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"Sorocaba\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Caminhonete\",\n    \"id_segmento\": \"Comercial Leve\"\n  },\n  {\n    \"ID\": 4905,\n    \"url\": \"192.168.33.22_23022024_092309_198887417_IEO2560.jpg\",\n    \"plate\": \"IEO2560\",\n    \"data_captura\": 1708680189000,\n    \"cnpj\": 88254891000153,\n    \"Cidade\": \"Dois_Irmaos\",\n    \"Ponto\": \"Ponto_C10\",\n    \"address\": \"RUA NELCY KUHN\",\n    \"Direcao\": \"SEM INFORMA\\u00c7\\u00c3O\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL CLI\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1996\",\n    \"id_anoModelo\": \"1996\",\n    \"id_cor\": \"VERDE\",\n    \"id_municipio\": \"Navegantes\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SC\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5023,\n    \"url\": \"192_168_29_117_23022024_092139_2_ACC8141.jpg\",\n    \"plate\": \"ACC8141\",\n    \"data_captura\": 1708680099000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C7\",\n    \"address\": \"Rua Jo\\u00e3o Aloysio Algayer 7590, Lomba Grande - 93490-000 Novo Hamburgo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"XL 250 R\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1982\",\n    \"id_anoModelo\": \"1982\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Londrina\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"PR\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5024,\n    \"url\": \"192_168_29_117_23022024_092139_2_ACC8141.jpg\",\n    \"plate\": \"ACC8141\",\n    \"data_captura\": 1708680099000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C7\",\n    \"address\": \"Rua Jo\\u00e3o Aloysio Algayer 7590, Lomba Grande - 93490-000 Novo Hamburgo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"XL 250 R\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1982\",\n    \"id_anoModelo\": \"1982\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Londrina\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"PR\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4904,\n    \"url\": \"192_168_28_31_23022024_091652_1_IQU8822.jpg\",\n    \"plate\": \"IQU8822\",\n    \"data_captura\": 1708679812000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C21\",\n    \"address\": \"Rua Primeiro de Mar\\u00e7o 5045 (Est Santo Afonso)\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FORD\",\n    \"id_modelo\": \"RANGER LTD 13P\",\n    \"id_origem\": \"IMPORTADO\",\n    \"id_ano\": \"2009\",\n    \"id_anoModelo\": \"2010\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"Alvorada\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Caminhonete\",\n    \"id_segmento\": \"Comercial Leve\"\n  },\n  {\n    \"ID\": 4903,\n    \"url\": \"192_168_28_14_23022024_090540_2_IWO5050.jpg\",\n    \"plate\": \"IWO5050\",\n    \"data_captura\": 1708679140000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C4\",\n    \"address\": \"Av. Cel. Frederico Linck x BR116 \",\n    \"Direcao\": \"Sa\\u00edda BR116\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FORD\",\n    \"id_modelo\": \"FOCUS GHIA 2.0LFC\",\n    \"id_origem\": \"IMPORTADO\",\n    \"id_ano\": \"2009\",\n    \"id_anoModelo\": \"2009\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Novo Hamburgo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5026,\n    \"url\": \"192_168_28_111_23022024_082511_1_LZM2884.jpg\",\n    \"plate\": \"LZM2884\",\n    \"data_captura\": 1708676711000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C1\",\n    \"address\": \"BR116 x Av 7 Setembro\",\n    \"Direcao\": \"BR116->NH\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FORD\",\n    \"id_modelo\": \"F1000 SS\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1994\",\n    \"id_anoModelo\": \"1994\",\n    \"id_cor\": \"DOURADA\",\n    \"id_municipio\": \"S\\u00e3o Joaquim\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SC\",\n    \"id_tipo_veiculo\": \"Camioneta\",\n    \"id_segmento\": \"Comercial Leve\"\n  },\n  {\n    \"ID\": 4899,\n    \"url\": \"192_168_28_34_23022024_081347_2_CCS6661.jpg\",\n    \"plate\": \"CCS6661\",\n    \"data_captura\": 1708676027000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C24\",\n    \"address\": \"Rua Jos\\u00e9 do Patroc\\u00ednio\",\n    \"Direcao\": \"Sa\\u00edda BR116\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"IMP\",\n    \"id_modelo\": \"GM ASTRA GLS\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1995\",\n    \"id_anoModelo\": \"1995\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5030,\n    \"url\": \"192_168_28_131_23022024_071854_2_OAX8679.jpg\",\n    \"plate\": \"OAX8679\",\n    \"data_captura\": 1708672734000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C21\",\n    \"address\": \"Rua Primeiro de Mar\\u00e7o 5045 (Est Santo Afonso)\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 150 FAN ESI\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2012\",\n    \"id_anoModelo\": \"2012\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"Primavera do Leste\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"MT\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5031,\n    \"url\": \"192.168.29.16_23022024_064412_1851555193_MCH9465.jpg\",\n    \"plate\": \"MCH9465\",\n    \"data_captura\": 1708670652000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C6\",\n    \"address\": \"Avenida Caxias do Sul 1309, Rio dos Sinos - 93110-000 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"SR\",\n    \"id_modelo\": \"FACCHINI SRF CF\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2004\",\n    \"id_anoModelo\": \"2004\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Blumenau\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SC\",\n    \"id_tipo_veiculo\": \"Semi-Reboque\",\n    \"id_segmento\": \"Implemento Rodoviario\"\n  },\n  {\n    \"ID\": 5032,\n    \"url\": \"192_168_28_34_23022024_064037_1_ITS2D40.jpg\",\n    \"plate\": \"ITS2D40\",\n    \"data_captura\": 1708670437000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C24\",\n    \"address\": \"Rua Jos\\u00e9 do Patroc\\u00ednio\",\n    \"Direcao\": \"Sa\\u00edda BR116\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"HYUNDAI\",\n    \"id_modelo\": \"SANTA FE 2.4\",\n    \"id_origem\": \"IMPORTADO\",\n    \"id_ano\": \"2011\",\n    \"id_anoModelo\": \"2012\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Novo Hamburgo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Camioneta\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5033,\n    \"url\": \"192_168_33_14_23022024_062121_2_IWG0047.jpg\",\n    \"plate\": \"IWG0047\",\n    \"data_captura\": 1708669281000,\n    \"cnpj\": 88254891000153,\n    \"Cidade\": \"Dois_Irmaos\",\n    \"Ponto\": \"Ponto_C4\",\n    \"address\": \"Rua Alberto Rubenich 7715, Floresta Dois Irm\\u00e3os / BR\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"CHEVROLET\",\n    \"id_modelo\": \"CLASSIC LS\",\n    \"id_origem\": \"IMPORTADO\",\n    \"id_ano\": \"2014\",\n    \"id_anoModelo\": \"2015\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Alvorada\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5036,\n    \"url\": \"192_168_28_34_23022024_054343_1_IJU1693.jpg\",\n    \"plate\": \"IJU1693\",\n    \"data_captura\": 1708667023000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C24\",\n    \"address\": \"Rua Jos\\u00e9 do Patroc\\u00ednio\",\n    \"Direcao\": \"Sa\\u00edda BR116\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"FUSCA 1300\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1980\",\n    \"id_anoModelo\": \"1981\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Viam\\u00e3o\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5034,\n    \"url\": \"192_168_28_39_23022024_053953_2_IIE2D81.jpg\",\n    \"plate\": \"IIE2D81\",\n    \"data_captura\": 1708666793000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C29\",\n    \"address\": \"Rua Primeiro de Mar\\u00e7o 5045 (Est Santo Afonso)\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL SPECIAL\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1998\",\n    \"id_anoModelo\": \"1999\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Porto Alegre\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5035,\n    \"url\": \"192_168_29_22_23022024_053626_2_ITW6664.jpg\",\n    \"plate\": \"ITW6664\",\n    \"data_captura\": 1708666586000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C12\",\n    \"address\": \"Avenida Feitoria 156, S\\u00e3o Jos\\u00e9 - 93030-220 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FORD\",\n    \"id_modelo\": \"FIESTA 1.6 FLEX\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2012\",\n    \"id_anoModelo\": \"2013\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"Porto Alegre\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5037,\n    \"url\": \"192_168_28_33_23022024_050920_2_JIL1111.jpg\",\n    \"plate\": \"JIL1111\",\n    \"data_captura\": 1708664960000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C23\",\n    \"address\": \"Rua Icaro x Av. Victor Hugo Kunz\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FIAT\",\n    \"id_modelo\": \"TEMPRA OURO 16V\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1994\",\n    \"id_anoModelo\": \"1995\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5038,\n    \"url\": \"192_168_29_113_23022024_050317_2_JII4111.jpg\",\n    \"plate\": \"JII4111\",\n    \"data_captura\": 1708664597000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C3\",\n    \"address\": \"Avenida Mau\\u00e1 4456, Centro - 93218-270 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CBR 600RR\",\n    \"id_origem\": \"IMPORTADO\",\n    \"id_ano\": \"2010\",\n    \"id_anoModelo\": \"2011\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Bras\\u00edlia\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"DF\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5047,\n    \"url\": \"192_168_28_134_23022024_013839_1_JEI9H13.jpg\",\n    \"plate\": \"JEI9H13\",\n    \"data_captura\": 1708652319000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C24\",\n    \"address\": \"Rua Jos\\u00e9 do Patroc\\u00ednio\",\n    \"Direcao\": \"Sa\\u00edda BR116\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"IMP\",\n    \"id_modelo\": \"GM D20\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1995\",\n    \"id_anoModelo\": \"1996\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Bras\\u00edlia\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"DF\",\n    \"id_tipo_veiculo\": \"Camioneta\",\n    \"id_segmento\": \"Comercial Leve\"\n  },\n  {\n    \"ID\": 5046,\n    \"url\": \"192_168_28_132_23022024_013648_1_IIV9A80.jpg\",\n    \"plate\": \"IIV9A80\",\n    \"data_captura\": 1708652208000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C22\",\n    \"address\": \"Avenida dos Munic\\u00edpios 7380\",\n    \"Direcao\": \"NH->CB\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL 16V\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1999\",\n    \"id_anoModelo\": \"1999\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Taquara\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5048,\n    \"url\": \"192_168_28_30_23022024_012631_1_LND5672.jpg\",\n    \"plate\": \"LND5672\",\n    \"data_captura\": 1708651591000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C20\",\n    \"address\": \"Av. Vitor hugo Kunz x Av Reinaldo Kaiser\",\n    \"Direcao\": \"NH->CB\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 125 TITAN ES\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2000\",\n    \"id_anoModelo\": \"2000\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Rio de Janeiro\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5049,\n    \"url\": \"192_168_28_132_23022024_003338_2_IWK3H69.jpg\",\n    \"plate\": \"IWK3H69\",\n    \"data_captura\": 1708648418000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C22\",\n    \"address\": \"Avenida dos Munic\\u00edpios 7380\",\n    \"Direcao\": \"NH->CB\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CITY EXL CVT\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2015\",\n    \"id_anoModelo\": \"2015\",\n    \"id_cor\": \"CINZA\",\n    \"id_municipio\": \"Porto Alegre\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5050,\n    \"url\": \"192_168_28_33_23022024_003206_2_IIU1265.jpg\",\n    \"plate\": \"IIU1265\",\n    \"data_captura\": 1708648326000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C23\",\n    \"address\": \"Rua Icaro x Av. Victor Hugo Kunz\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL SPECIAL\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1999\",\n    \"id_anoModelo\": \"1999\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Est\\u00e2ncia Velha\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5051,\n    \"url\": \"192_168_29_117_23022024_003025_1_IGE7699.jpg\",\n    \"plate\": \"IGE7699\",\n    \"data_captura\": 1708648225000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C7\",\n    \"address\": \"Rua Jo\\u00e3o Aloysio Algayer 7590, Lomba Grande - 93490-000 Novo Hamburgo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FIAT\",\n    \"id_modelo\": \"TEMPRA SX\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1997\",\n    \"id_anoModelo\": \"1997\",\n    \"id_cor\": \"CINZA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5052,\n    \"url\": \"192_168_28_38_23022024_002455_1_LSR2499.jpg\",\n    \"plate\": \"LSR2499\",\n    \"data_captura\": 1708647895000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C28\",\n    \"address\": \"NH 28 - R Guia Lopes x Porto Seco\",\n    \"Direcao\": \"Leste->Canudos\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"RENAULT\",\n    \"id_modelo\": \"LOGAN EXP 16\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2008\",\n    \"id_anoModelo\": \"2008\",\n    \"id_cor\": \"AZUL\",\n    \"id_municipio\": \"Rio de Janeiro\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5053,\n    \"url\": \"192_168_29_13_22022024_235021_1_JEX4I79.jpg\",\n    \"plate\": \"JEX4I79\",\n    \"data_captura\": 1708645821000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C3\",\n    \"address\": \"Avenida Mau\\u00e1 4456, Centro - 93218-270 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"GOL PLUS MI\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1997\",\n    \"id_anoModelo\": \"1998\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Bras\\u00edlia\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"DF\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5054,\n    \"url\": \"192_168_28_111_22022024_233741_1_IJQ3F32.jpg\",\n    \"plate\": \"IJQ3F32\",\n    \"data_captura\": 1708645061000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C1\",\n    \"address\": \"BR116 x Av 7 Setembro\",\n    \"Direcao\": \"BR116->NH\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 125 TITAN KS\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2000\",\n    \"id_anoModelo\": \"2000\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Porto Alegre\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5055,\n    \"url\": \"192_168_29_117_22022024_231516_2_ICT7F06.jpg\",\n    \"plate\": \"ICT7F06\",\n    \"data_captura\": 1708643716000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C7\",\n    \"address\": \"Rua Jo\\u00e3o Aloysio Algayer 7590, Lomba Grande - 93490-000 Novo Hamburgo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"FIAT\",\n    \"id_modelo\": \"UNO ELECTRONIC\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1995\",\n    \"id_anoModelo\": \"1995\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Joinville\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SC\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5056,\n    \"url\": \"192_168_28_111_22022024_230216_1_DQC7836.jpg\",\n    \"plate\": \"DQC7836\",\n    \"data_captura\": 1708642936000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C1\",\n    \"address\": \"BR116 x Av 7 Setembro\",\n    \"Direcao\": \"BR116->NH\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FIAT\",\n    \"id_modelo\": \"SIENA ELX FLEX\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2005\",\n    \"id_anoModelo\": \"2006\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Taubat\\u00e9\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5057,\n    \"url\": \"192_168_28_27_22022024_225331_1_IPI8762.jpg\",\n    \"plate\": \"IPI8762\",\n    \"data_captura\": 1708642411000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C17\",\n    \"address\": \"Rua Engenheiro Jorge Schury 1473\",\n    \"Direcao\": \"Sa\\u00edda Kephas\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FORD\",\n    \"id_modelo\": \"KA FLEX\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2008\",\n    \"id_anoModelo\": \"2009\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Sapucaia do Sul\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5059,\n    \"url\": \"192_168_28_134_22022024_224623_2_JEX9023.jpg\",\n    \"plate\": \"JEX9023\",\n    \"data_captura\": 1708641983000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C24\",\n    \"address\": \"Rua Jos\\u00e9 do Patroc\\u00ednio\",\n    \"Direcao\": \"Sa\\u00edda BR116\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"FUSCA 1500\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1973\",\n    \"id_anoModelo\": \"1973\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Goi\\u00e2nia\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"GO\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5058,\n    \"url\": \"192_168_28_138_22022024_223739_1_FDI2C44.jpg\",\n    \"plate\": \"FDI2C44\",\n    \"data_captura\": 1708641459000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C28\",\n    \"address\": \"NH 28 - R Guia Lopes x Porto Seco\",\n    \"Direcao\": \"Oeste->Sto. Afonso\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"JEEP\",\n    \"id_modelo\": \"COMPASS SPORT2.0L\",\n    \"id_origem\": \"IMPORTADO\",\n    \"id_ano\": \"2012\",\n    \"id_anoModelo\": \"2012\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Camioneta\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5061,\n    \"url\": \"192_168_28_131_22022024_222646_1_ISO4G61.jpg\",\n    \"plate\": \"ISO4G61\",\n    \"data_captura\": 1708640806000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C21\",\n    \"address\": \"Rua Primeiro de Mar\\u00e7o 5045 (Est Santo Afonso)\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"NXR150 BROS ESD\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2011\",\n    \"id_anoModelo\": \"2012\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"S\\u00e3o Leopoldo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5062,\n    \"url\": \"192_168_28_131_22022024_222646_1_ISO4G61.jpg\",\n    \"plate\": \"ISO4G61\",\n    \"data_captura\": 1708640806000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C21\",\n    \"address\": \"Rua Primeiro de Mar\\u00e7o 5045 (Est Santo Afonso)\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"NXR150 BROS ESD\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2011\",\n    \"id_anoModelo\": \"2012\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"S\\u00e3o Leopoldo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5060,\n    \"url\": \"192_168_28_131_22022024_222646_1_ISO4G61.jpg\",\n    \"plate\": \"ISO4G61\",\n    \"data_captura\": 1708640806000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C21\",\n    \"address\": \"Rua Primeiro de Mar\\u00e7o 5045 (Est Santo Afonso)\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"NXR150 BROS ESD\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2011\",\n    \"id_anoModelo\": \"2012\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"S\\u00e3o Leopoldo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5063,\n    \"url\": \"192_168_29_13_22022024_215112_1_INA2094.jpg\",\n    \"plate\": \"INA2094\",\n    \"data_captura\": 1708638672000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C3\",\n    \"address\": \"Avenida Mau\\u00e1 4456, Centro - 93218-270 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FORD\",\n    \"id_modelo\": \"FOCUS 1.6L HA\",\n    \"id_origem\": \"IMPORTADO\",\n    \"id_ano\": \"2006\",\n    \"id_anoModelo\": \"2006\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Porto Alegre\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5065,\n    \"url\": \"192_168_29_13_22022024_214431_1_EII1111.jpg\",\n    \"plate\": \"EII1111\",\n    \"data_captura\": 1708638271000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C3\",\n    \"address\": \"Avenida Mau\\u00e1 4456, Centro - 93218-270 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FIAT\",\n    \"id_modelo\": \"PREMIO CS IE\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1993\",\n    \"id_anoModelo\": \"1993\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5066,\n    \"url\": \"192_168_28_132_22022024_214304_2_FJA5I64.jpg\",\n    \"plate\": \"FJA5I64\",\n    \"data_captura\": 1708638184000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C22\",\n    \"address\": \"Avenida dos Munic\\u00edpios 7380\",\n    \"Direcao\": \"NH->CB\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"FORD\",\n    \"id_modelo\": \"FIESTA SEDAN1.6FLEX\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2013\",\n    \"id_anoModelo\": \"2013\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5067,\n    \"url\": \"192_168_28_120_22022024_214039_2_IIP8A26.jpg\",\n    \"plate\": \"IIP8A26\",\n    \"data_captura\": 1708638039000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C10\",\n    \"address\": \"BR-116 3205 x Rinc\\u00e3o dos Ilh\\u00e9us\",\n    \"Direcao\": \"BR116->NH\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"FIAT\",\n    \"id_modelo\": \"PALIO ELX\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1998\",\n    \"id_anoModelo\": \"1999\",\n    \"id_cor\": \"VERDE\",\n    \"id_municipio\": \"Porto Alegre\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5068,\n    \"url\": \"192_168_29_27_22022024_213309_1_DWX8853.jpg\",\n    \"plate\": \"DWX8853\",\n    \"data_captura\": 1708637589000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C17\",\n    \"address\": \"Avenida Henrique Bier 2635, Campina - 93135-000 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 125 FAN\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2007\",\n    \"id_anoModelo\": \"2008\",\n    \"id_cor\": \"CINZA\",\n    \"id_municipio\": \"Ferraz de Vasconcelos\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5070,\n    \"url\": \"192_168_29_127_22022024_212256_1_IOQ8877.jpg\",\n    \"plate\": \"IOQ8877\",\n    \"data_captura\": 1708636976000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C17\",\n    \"address\": \"Avenida Henrique Bier 2635, Campina - 93135-000 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 125 FAN\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2008\",\n    \"id_anoModelo\": \"2008\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"S\\u00e3o Leopoldo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5071,\n    \"url\": \"192_168_29_27_22022024_211541_1_ICQ5412.jpg\",\n    \"plate\": \"ICQ5412\",\n    \"data_captura\": 1708636541000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C17\",\n    \"address\": \"Avenida Henrique Bier 2635, Campina - 93135-000 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"SAVEIRO CL 1.8\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1995\",\n    \"id_anoModelo\": \"1995\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"S\\u00e3o Leopoldo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Camioneta\",\n    \"id_segmento\": \"Comercial Leve\"\n  },\n  {\n    \"ID\": 5072,\n    \"url\": \"192_168_29_42_22022024_211526_2_LUL6028.jpg\",\n    \"plate\": \"LUL6028\",\n    \"data_captura\": 1708636526000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C32\",\n    \"address\": \"Avenida Henrique Bier 1251, Campina S\\u00e3o Leopoldo / BR\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"BIZ 100 ES\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2014\",\n    \"id_anoModelo\": \"2015\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Rio de Janeiro\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Motoneta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 5073,\n    \"url\": \"192_168_28_39_22022024_210340_2_AXA8C93.jpg\",\n    \"plate\": \"AXA8C93\",\n    \"data_captura\": 1708635820000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C29\",\n    \"address\": \"Rua Primeiro de Mar\\u00e7o 5045 (Est Santo Afonso)\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"RENAULT\",\n    \"id_modelo\": \"SANDERO AUT1016V\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2013\",\n    \"id_anoModelo\": \"2013\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"Port\\u00e3o\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5074,\n    \"url\": \"192_168_28_38_22022024_195148_2_IWK7152.jpg\",\n    \"plate\": \"IWK7152\",\n    \"data_captura\": 1708631508000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C28\",\n    \"address\": \"NH 28 - R Guia Lopes x Porto Seco\",\n    \"Direcao\": \"Leste->Canudos\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"CHEVROLET\",\n    \"id_modelo\": \"CELTA 1.0L LT\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2015\",\n    \"id_anoModelo\": \"2015\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Santa Cruz do Sul\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5075,\n    \"url\": \"192_168_29_31_22022024_194643_2_LTL9454.jpg\",\n    \"plate\": \"LTL9454\",\n    \"data_captura\": 1708631203000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C21\",\n    \"address\": \"Avenida Feitoria 3290, Feitoria S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FIAT\",\n    \"id_modelo\": \"SIENA ATTRACT 1.0\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2018\",\n    \"id_anoModelo\": \"2019\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Rio de Janeiro\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5076,\n    \"url\": \"192_168_29_31_22022024_194643_2_LTL9454.jpg\",\n    \"plate\": \"LTL9454\",\n    \"data_captura\": 1708631203000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C21\",\n    \"address\": \"Avenida Feitoria 3290, Feitoria S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"FIAT\",\n    \"id_modelo\": \"SIENA ATTRACT 1.0\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2018\",\n    \"id_anoModelo\": \"2019\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Rio de Janeiro\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5077,\n    \"url\": \"192_168_28_30_22022024_191028_1_CIV4D64.jpg\",\n    \"plate\": \"CIV4D64\",\n    \"data_captura\": 1708629028000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C20\",\n    \"address\": \"Av. Vitor hugo Kunz x Av Reinaldo Kaiser\",\n    \"Direcao\": \"NH->CB\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"IMP\",\n    \"id_modelo\": \"FORD RANGER XL B\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1997\",\n    \"id_anoModelo\": \"1997\",\n    \"id_cor\": \"PRETA\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Camioneta\",\n    \"id_segmento\": \"Comercial Leve\"\n  },\n  {\n    \"ID\": 5081,\n    \"url\": \"192_168_28_34_22022024_182122_2_EKG9024.jpg\",\n    \"plate\": \"EKG9024\",\n    \"data_captura\": 1708626082000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C24\",\n    \"address\": \"Rua Jos\\u00e9 do Patroc\\u00ednio\",\n    \"Direcao\": \"Sa\\u00edda BR116\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 125 FAN KS\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2009\",\n    \"id_anoModelo\": \"2009\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"C\\u00e2ndido Mota\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 4883,\n    \"url\": \"192_168_28_28_22022024_163848_2_BQH9012.jpg\",\n    \"plate\": \"BQH9012\",\n    \"data_captura\": 1708619928000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C18\",\n    \"address\": \"Avenida V\\u00edtor Hugo Kunz 3077\",\n    \"Direcao\": \"CB->NH\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"VW\",\n    \"id_modelo\": \"BRASILIA\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1977\",\n    \"id_anoModelo\": \"1977\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Campinas\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5085,\n    \"url\": \"192_168_28_33_22022024_163830_2_KOF9329.jpg\",\n    \"plate\": \"KOF9329\",\n    \"data_captura\": 1708619910000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C23\",\n    \"address\": \"Rua Icaro x Av. Victor Hugo Kunz\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"GM\",\n    \"id_modelo\": \"OPALA\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1978\",\n    \"id_anoModelo\": \"1978\",\n    \"id_cor\": \"AMARELA\",\n    \"id_municipio\": \"Nova Friburgo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RJ\",\n    \"id_tipo_veiculo\": \"Nao Identificado\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 4880,\n    \"url\": \"192_168_28_30_22022024_155841_1_IGK2B73.jpg\",\n    \"plate\": \"IGK2B73\",\n    \"data_captura\": 1708617521000,\n    \"cnpj\": 88254875000160,\n    \"Cidade\": \"Novo_Hamburgo\",\n    \"Ponto\": \"Ponto_C20\",\n    \"address\": \"Av. Vitor hugo Kunz x Av Reinaldo Kaiser\",\n    \"Direcao\": \"NH->CB\",\n    \"id_Modelo_Placa\": \"MERCOSUL\",\n    \"id_marca\": \"GM\",\n    \"id_modelo\": \"KADETT GL\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"1997\",\n    \"id_anoModelo\": \"1997\",\n    \"id_cor\": \"VERMELHA\",\n    \"id_municipio\": \"Novo Hamburgo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5087,\n    \"url\": \"192_168_29_13_22022024_155544_2_FAC0819.jpg\",\n    \"plate\": \"FAC0819\",\n    \"data_captura\": 1708617344000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C3\",\n    \"address\": \"Avenida Mau\\u00e1 4456, Centro - 93218-270 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"ENTRADA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"CHEVROLET\",\n    \"id_modelo\": \"ONIX 1.4AT ADV\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2018\",\n    \"id_anoModelo\": \"2018\",\n    \"id_cor\": \"PRATA\",\n    \"id_municipio\": \"Campinas\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 5088,\n    \"url\": \"192_168_29_115_22022024_152439_2_JII4111.jpg\",\n    \"plate\": \"JII4111\",\n    \"data_captura\": 1708615479000,\n    \"cnpj\": 89814693000160,\n    \"Cidade\": \"Sao_Leopoldo\",\n    \"Ponto\": \"Ponto_C5\",\n    \"address\": \"Avenida Caxias do Sul 1069, sao leopoldo - 93110-000 S\\u00e3o Leopoldo\",\n    \"Direcao\": \"SA\\u00cdDA\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CBR 600RR\",\n    \"id_origem\": \"IMPORTADO\",\n    \"id_ano\": \"2010\",\n    \"id_anoModelo\": \"2011\",\n    \"id_cor\": \"BRANCA\",\n    \"id_municipio\": \"Bras\\u00edlia\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"DF\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  },\n  {\n    \"ID\": 2127,\n    \"url\": \"192.168.33.20_09022024_194442_1559953747_ISN3422.jpg\",\n    \"plate\": \"ISN3422\",\n    \"data_captura\": 1707507882000,\n    \"cnpj\": 88254891000153,\n    \"Cidade\": \"Dois_Irmaos\",\n    \"Ponto\": \"Ponto_C11\",\n    \"address\": \"RUA ANITA GARIBALDI x BR 116\",\n    \"Direcao\": \"Bairro/Centro\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"CHEVROLET\",\n    \"id_modelo\": \"CLASSIC LS\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2011\",\n    \"id_anoModelo\": \"2012\",\n    \"id_cor\": \"Prata\",\n    \"id_municipio\": \"S\\u00e3o Paulo\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"SP\",\n    \"id_tipo_veiculo\": \"Automovel\",\n    \"id_segmento\": \"Auto\"\n  },\n  {\n    \"ID\": 3526,\n    \"url\": \"192.168.33.120_08022024_114314_937196707_INJ8716.jpg\",\n    \"plate\": \"INJ8716\",\n    \"data_captura\": 1707392594000,\n    \"cnpj\": 88254891000153,\n    \"Cidade\": \"Dois_Irmaos\",\n    \"Ponto\": \"Ponto_C11\",\n    \"address\": \"RUA ANITA GARIBALDI x BR 116\",\n    \"Direcao\": \"Centro/Bairro\",\n    \"id_Modelo_Placa\": \"NACIONAL\",\n    \"id_marca\": \"HONDA\",\n    \"id_modelo\": \"CG 150 TITAN KS\",\n    \"id_origem\": \"NACIONAL\",\n    \"id_ano\": \"2006\",\n    \"id_anoModelo\": \"2007\",\n    \"id_cor\": \"Azul\",\n    \"id_municipio\": \"Alvorada\",\n    \"id_situacao\": \"Roubo/Furto\",\n    \"id_uf\": \"RS\",\n    \"id_tipo_veiculo\": \"Motocicleta\",\n    \"id_segmento\": \"Moto\"\n  }\n]"
let _blackListMock = [
    {
        id: 1,
        plate: 'ABC1234',
        date: '2024-01-01',
        numberRegister: '123456',
        codeOccurence: 'OCC001',
        description: 'Descrição 1 Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição GranFinale!',
        observation: 'Observação 1',
        createUserEmail: 'usuario1@email.com'
    },
    {
        id: 2,
        plate: 'DEF5678',
        date: '2024-02-02',
        numberRegister: '234567',
        codeOccurence: 'OCC002',
        description: 'Descrição 2',
        observation: 'Observação 2',
        createUserEmail: 'usuario2@email.com'
    },
    {
        id: 3,
        plate: 'GHI9012',
        date: '2024-03-03',
        numberRegister: '345678',
        codeOccurence: 'OCC003',
        description: 'Descrição 3',
        observation: 'Observação 3',
        createUserEmail: 'usuario3@email.com'
    },
    {
        id: 4,
        plate: 'JKL3456',
        date: '2024-04-04',
        numberRegister: '456789',
        codeOccurence: 'OCC004',
        description: 'Descrição 4',
        observation: 'Observação 4',
        createUserEmail: 'usuario4@email.com'
    },
    {
        id: 5,
        plate: 'MNO7890',
        date: '2024-05-05',
        numberRegister: '567890',
        codeOccurence: 'OCC005',
        description: 'Descrição 5',
        observation: 'Observação 5',
        createUserEmail: 'usuario5@email.com'
    }
];
/////Funções para carregar o bootstrap/////
async function loadBootstrap() {
    return new Promise(function(resolve, reject) {
        require(['bootstrap'], function(bootstrap) {
            _bootstrap = bootstrap;
            resolve();
        });
    });
}

async function getAlerts() {
    // let response = await fetch(envAlertas.URL, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-api-key': envAlertas.token
    //     },
    //     body: JSON.stringify({
    //         lastRequest: _lastRequest === null ? '' : _lastRequest,
    //         city: _user.city
    //     })
    // });

    // if (!response.ok) 
    //     throw new Error(`HTTP error! status: ${response.status}`);
    
    //let result = await response.json();
    
    result = JSON.parse(a);
    if (_lastRequest === null && result.length > 0) {
        _alertList = result;
        _alertList = _alertList.map(item => {
            return {
                ...item,
                ID: Number(item.ID),
                Cidade: item.Cidade.replace("_", " "), // Substitui o sublinhado por um espaço
                Ponto: item.Ponto.replace("_", " "), // Substitui o sublinhado por um espaço
                //data_captura: _dateTime.stringToDateAsHoursBR(item.data_captura),
            };
        });
    }
    else if (result.length > 0){
        let alerts = result.map(item => {
            return {
                ...item,
                ID: Number(item.ID),
                Cidade: item.Cidade.replace("_", " "), // Substitui o sublinhado por um espaço
                Ponto: item.Ponto.replace("_", " "), // Substitui o sublinhado por um espaço
                //: _dateTime.stringToDateAsHoursBR(item.data_captura),
            };
        });
        showNewAlertsToast(alerts);
    }
    _lastRequest = _dateTime.stringToDateHoursUS(new Date());
}
// fazer a requisição para obter a lista de alertas

async function putOCRValidator(idAlert, idTypeOCRValidator) {
    //localize o alerta pelo id
    let alert = _alertList.find(alert => alert.ID === idAlert);
    let body = {
        plate: alert.plate,
        data_captura: alert.data_captura,
        ocrValidation: idTypeOCRValidator,
        emailUser: _user.email,
        origem: 14553 //origem do alerta
    };
    //console.log(body);
    let response = await fetch(envAlertas.URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': envAlertas.token
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) 
        throw new Error(`HTTP error! status: ${response.status}`);
}

async function removerAlerta(id) {
    let response = await fetch(envAlertas.URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': envAlertas.token
        },
        body: JSON.stringify({ idDelete: id })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let result = await response.json();
    //console.log(result);
    return true;
}

// Função que gerencia a visibilidade do Loading //
function showLoading(divId, show) {
    let div = document.getElementById(divId);
    if (div)
        show ? div.style.display = '' : div.style.display = 'none';
}
// Cria o Modal //
async function showModalAlertas(bool) {
    if (!_bootstrap) 
        await loadBootstrap();
    let modalElement = document.getElementById('idAlertModal');
    if (modalElement) {
        if (_modalAlertas === null) {
            if (!_bootstrap.Modal.getInstance(modalElement))
                _modalAlertas = new _bootstrap.Modal(modalElement);
            //let modalTitle = modalElement.querySelector('.modal-header');
            let modalBodyInput = document.getElementById('idAlertPane');
            
            // Update the modal's content.
            // modalTitle.innerHTML = `
            //     <ul class="nav nav-tabs" id="idNavAlerts">
            //         <li class="nav-item">
            //             <a class="nav-link active" aria-current="page" href="#" >Alertas</a>
            //         </li>
            //         <li class="nav-item">
            //             <a class="nav-link" href="#" >Black List</a>
            //         </li>
            //         <li class="nav-item">
            //             <a class="nav-link" href="#">Link</a>
            //         </li>
            //         <li class="nav-item">
            //             <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            //         </li>
            //     </ul>
            //     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            // `;
            
            modalBodyInput.innerHTML = "";
            if(_alertList.length === 0) {
                modalBodyInput.innerHTML = `
                    <div class="card mt-2 mb-1">
                        <div class="card-body bg-warning-subtle p-1" style="border-radius: 5px">
                            <div class="row">
                                <div class="col-auto">
                                    <p class="fs-4 m-0">Nenhum alerta disponível</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            else {
                _alertList.forEach((alert, index) => {
                    modalBodyInput.innerHTML += `
                        <div class="card mt-2 mb-1">
                            <div class="card-body bg-warning-subtle p-1" style="border-radius: 5px">
                                <div class="row justify-content-start">
                                    <div class="col-auto pe-1">
                                        <p class="mb-1" style="position: relative;">Placa: 
                                            <span class="fw-bold fs-4" onclick="copyTextToClipboard('${alert.plate}', event)" style="cursor: pointer;">${alert.plate}</span>  
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="21" viewBox="0 0 512 512" style="cursor: pointer; position: absolute; padding-left: 5px;" onclick="showDivProcergs('idShowProcergs${index}');"
                                            ><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                                        </p>
                                        <p class=" mb-1">${alert.id_situacao}</p>
                                        <p class=" mb-1">Data: <span>${_dateTime.stringToDateAsHoursBR(alert.data_captura)}</span></p>
                                    </div>
                                    <div class="col-auto p-0">
                                        <a href="javascript:void(0);" onclick="showFullImageOCRValidation('idShowImageFull0${index}')">
                                            <img src="https://vision-safeway.s3.sa-east-1.amazonaws.com/${alert.cnpj}/${alert.url}" alt="Placa" style="min-height: 96px; max-width: 125px; border-radius: 6px; cursor: pointer;">
                                        </a>
                                    </div>
                                    <div class="col-auto ps-1 pe-0" style="width: 377px;">
                                        <p class=" m-0">Cidade: ${alert.Cidade}</p>
                                        <p class=" m-0">Ponto: ${alert.Ponto}</p>
                                        <p class=" m-0">Direção: ${alert.Direcao}</p>
                                        <p class=" m-0">End: ${alert.address}</p>
                                    </div>
                                    <div class="col-auto ps-1 pe-0" style="width: 360px;">
                                        <p class=" m-0">Marca: ${alert.id_marca}</p>
                                        <p class=" m-0">Modelo: ${alert.id_modelo}</p>
                                        <p class=" m-0">Cor/Tipo: ${alert.id_cor}/${alert.id_tipo_veiculo}</p>
                                        <p class=" m-0">UF/Município: ${alert.id_uf}/${alert.id_municipio}</p>
                                    </div>
                                    <!-- <div class="col-auto ps-0 text-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="21" viewBox="0 0 448 512" style="cursor: pointer;" class="p-1"
                                            data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Após apagar o alerta, a passagem pode ser visualizada na Pesquisa Avançada" aria-describedby="popover988860" 
                                            data-bs-trigger="hover focus" onclick="deleteAlertRemoveDiv(event, ${alert.ID}, true);"
                                        ><path fill="#000000" d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                                    </div> -->
                                </div>
                                <div class="row card m-1" id="idShowProcergs${index}" style="display: none;">
                                   
                                </div>
                                <div class="row card m-1" id="idShowImageFull0${index}" style="display: none;">
                                    <div class="col-auto text-center mb-1">
                                        <p class="fs-5 m-1">Avalie a assertividade da OCR e a qualidade da imagem</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512" style="cursor: pointer;" onclick="updateOCRValidator(event, ${alert.ID}, 14550)"
                                            data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="OCR correta" aria-describedby="popover988860" 
                                            data-bs-trigger="hover focus"
                                        ><path fill="#63E6BE" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg>
                                        <svg class="ms-3" xmlns="http://www.w3.org/2000/svg" height="32" width="40" viewBox="0 0 640 512" style="cursor: pointer;" onclick="updateOCRValidator(event, ${alert.ID}, 14551)"
                                            data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Placa ilegível" aria-describedby="popover988860" 
                                            data-bs-trigger="hover focus"
                                        ><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223 149.5c48.6-44.3 123-50.8 179.3-11.7c60.8 42.4 78.9 123.2 44.2 186.9L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3L223 149.5zm-139.9 12c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8L83.1 161.5zm-50 86.3c-1.8 6.8-1.3 14 1.4 20.5c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8z"/></svg>
                                        <svg class="ms-3" xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512" style="cursor: pointer;" onclick="updateOCRValidator(event, ${alert.ID}, 14552)"
                                            data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="OCR incorreta" aria-describedby="popover988860" 
                                            data-bs-trigger="hover focus"
                                        ><path fill="#fe1616" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                                    </div>
                                    <img style="width:100%; border-radius: 5px;" class="p-0" src="https://vision-safeway.s3.sa-east-1.amazonaws.com/${alert.cnpj}/${alert.url}">
                                </div>
                            </div>
                        </div>
                    `;
    
                });
            }
            createPopOver();
        }
        
        // Show the modal
        if (bool)
            _modalAlertas.show();
    }
}
window.showModalAlertas = showModalAlertas;

async function updateModal(alerts) {
    if (!_bootstrap) 
        await loadBootstrap();
    let modalElement = document.getElementById('idAlertModal');
    if (modalElement) {
        let modalBodyInput = modalElement.querySelector('.modal-body');
        let existingElements = modalBodyInput.children.length;
        //acrecente os novos alertas ao modal, eles devem ficar no topo, acima dos já existentes
        alerts.forEach((alert, index) => {
            let newElement = document.createElement('div');
            newElement.className = "card mt-2 mb-1";
            newElement.innerHTML =`
                <div class="card-body bg-warning-subtle p-1" style="border-radius: 5px">
                    <div class="row justify-content-start">
                        <div class="col-auto pe-1">
                            <p class="mb-1" style="position: relative;">Placa: 
                                <span class="fw-bold fs-4" onclick="copyTextToClipboard('${alert.plate}', event)" style="cursor: pointer;">${alert.plate}</span>  
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="21" viewBox="0 0 512 512" style="cursor: pointer; position: absolute; padding-left: 5px;" onclick="showDivProcergs('idShowProcergs${index + existingElements + 1}');"
                                ><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                            </p>
                            <p class=" mb-1">${alert.id_situacao}</p>
                            <p class=" mb-1">Data: <span>${_dateTime.stringToDateAsHoursBR(alert.data_captura)}</span></p>
                        </div>
                        <div class="col-auto p-0">
                            <a href="javascript:void(0);" onclick="showFullImageOCRValidation('idShowImageFull0${index + existingElements + 1}')">
                                <img src="https://vision-safeway.s3.sa-east-1.amazonaws.com/${alert.cnpj}/${alert.url}" alt="Placa" style="min-height: 96px; max-width: 125px; border-radius: 6px; cursor: pointer;">
                            </a>
                        </div>
                        <div class="col-auto ps-1 pe-0" style="width: 377px;">
                            <p class=" m-0">Cidade: ${alert.Cidade}</p>
                            <p class=" m-0">Ponto: ${alert.Ponto}</p>
                            <p class=" m-0">Direção: ${alert.Direcao}</p>
                            <p class=" m-0">End: ${alert.address}</p>
                        </div>
                        <div class="col-auto ps-1 pe-0" style="width: 360px;">
                            <p class=" m-0">Marca: ${alert.id_marca}</p>
                            <p class=" m-0">Modelo: ${alert.id_modelo}</p>
                            <p class=" m-0">Cor/Tipo: ${alert.id_cor}/${alert.id_tipo_veiculo}</p>
                            <p class=" m-0">UF/Município: ${alert.id_uf}/${alert.id_municipio}</p>
                        </div>
                        <!-- <div class="col-auto ps-0 text-end">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="21" viewBox="0 0 448 512" style="cursor: pointer;" class="p-1"
                                data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Após apagar o alerta, a passagem pode ser visualizada na Pesquisa Avançada" aria-describedby="popover988860" 
                                data-bs-trigger="hover focus" onclick="deleteAlertRemoveDiv(event, ${alert.ID}, true);"
                            ><path fill="#000000" d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                        </div> -->
                    </div>
                    <div class="row card m-1" id="idShowProcergs${index + existingElements + 1}" style="display: none;">
                                   
                    </div>
                    <div class="row card m-1" id="idShowImageFull0${index + existingElements + 1}" style="display: none;">
                        <div class="col-auto text-center mb-1">
                            <p class="fs-5 m-1">Avalie a assertividade da OCR e a qualidade da imagem</p>
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512" style="cursor: pointer;" onclick="updateOCRValidator(event, ${alert.ID}, 14550)"
                                data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="OCR correta" aria-describedby="popover988860" 
                                data-bs-trigger="hover focus"
                            ><path fill="#63E6BE" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg>
                            <svg class="ms-3" xmlns="http://www.w3.org/2000/svg" height="32" width="40" viewBox="0 0 640 512" style="cursor: pointer;" onclick="updateOCRValidator(event, ${alert.ID}, 14551)"
                                data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Placa ilegível" aria-describedby="popover988860" 
                                data-bs-trigger="hover focus"
                            ><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223 149.5c48.6-44.3 123-50.8 179.3-11.7c60.8 42.4 78.9 123.2 44.2 186.9L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3L223 149.5zm-139.9 12c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8L83.1 161.5zm-50 86.3c-1.8 6.8-1.3 14 1.4 20.5c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8z"/></svg>
                            <svg class="ms-3" xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512" style="cursor: pointer;" onclick="updateOCRValidator(event, ${alert.ID}, 14552)"
                                data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="OCR incorreta" aria-describedby="popover988860" 
                                data-bs-trigger="hover focus"
                            ><path fill="#fe1616" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                        </div>
                        <img style="width:100%; border-radius: 5px;" class="p-0" src="https://vision-safeway.s3.sa-east-1.amazonaws.com/${alert.cnpj}/${alert.url}">
                    </div>
                </div>
            `;
            modalBodyInput.prepend(newElement);
        });
        createPopOver();
    }
}

// Cria no Vision os elementos de alerta(botão flutuante, toast, modal)
function criarElementosHTML() {
    // Cria icone de notificação flutuante
    var botao = document.createElement('div');
    botao.innerHTML = `
        <button type="button" class="btn btn-secondary botaoNotificacao mt-3"onclick="showModalAlertas(true)" data-toggle="modal" data-target="#filtroPlacaModal" 
            id="idAlertIcon" style="background-color: #5c636a;"
        >
            <div class="iconeComContador">
                <svg xmlns="http://www.w3.org/2000/svg" height="27" width="20" viewBox="0 0 448 512">
                    <path fill="#ffffff" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/>
                </svg>
                <span class="contadorAlerta">
                    <span class="numeroContador" id="idCountAlertIcon"></span>
                </span>
            </div>
        </button>
    `;
    document.body.appendChild(botao);

    // Cria Toast
    let toast = document.createElement('div');
    toast.innerHTML = `
        <div aria-live="assertive" aria-atomic="true" class="position-relative">
            <div class="toast-container position-fixed top-0 end-0 p-3" id="idToastAlert"></div>
        </div>
    `;
    document.body.appendChild(toast);

    // Cria Modal
    var modal = document.createElement('div');
    modal.innerHTML = `
        <div class="modal fade" id="idAlertModal" tabindex="-1" aria-labelledby="AlertsModal" aria-hidden="true" style="padding-top: 45px;">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-warning pt-1 pb-0 position-sticky" style="top: -50px; z-index: 9999;">
                        <ul class="nav nav-tabs" id="idNavAlerts">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active  text-black" id="alertas-tab" data-bs-toggle="tab" data-bs-target="#idAlertPane" type="button" role="tab" aria-controls="alertas" aria-selected="true">Alertas</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link text-dark" id="blackList-tab" data-bs-toggle="tab" data-bs-target="#idBlackListPane" type="button" role="tab" aria-controls="blackList" aria-selected="false" onclick="checkFirstDivBlackList()">Black List</button>
                            </li>
                        </ul>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <div class="tab-content" id="alertModalTabContent">
                            <div class="tab-pane fade show active" id="idAlertPane" role="tabpanel" aria-labelledby="alertas-tab" tabindex="0">
                                <p class="text-center fs-5">Alertas</p>
                            </div>
                            <div class="tab-pane fade" id="idBlackListPane" role="tabpanel" aria-labelledby="blackList-tab" tabindex="0">
                                <p class="text-center fs-5">Black List</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    `;
    document.body.appendChild(modal);
}

// exibe/oculta a div com a imagem completa e a validação da OCR
function showFullImageOCRValidation(idDivImage) {
    let img = document.getElementById(idDivImage);
    if (img)
        img.style.display = img.style.display === 'none' ? '' : 'none';

}
document.showFullImageOCRValidation = showFullImageOCRValidation;

async function copyTextToClipboard(text, event) {
    try {
        await navigator.clipboard.writeText(text);
        let popover = new _bootstrap.Popover(event.target, {
            content: 'Placa copiada',
            placement: 'top'
        });
        popover.show();
        setTimeout(function() {
            popover.dispose();
        }, 2000);
    } catch (err) {
    }
}
document.copyTextToClipboard = copyTextToClipboard;

var _iframeProcergsElement;
function loadIframe() {
    if (!_iframeProcergsElement) {
        let htmlString = `
            <div class="col-auto text-center mb-1 p-0">
                <div class="consultaroubo" style="position: relative;"> 
                    <iframe id="consultaroubo-iframe" class="" allowfullscreen="" frameborder="0" src="https://secweb.procergs.com.br/sav/"
                    style="width: 100%; height: 320px;; border-radius: 5px;"
                    ></iframe>
                    <svg xmlns="http://www.w3.org/2000/svg" height="23" width="23" viewBox="0 0 512 512"
                        style="position: absolute; top: 5px; right: 22px; z-index: 99;"
                        data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="
                            Consulta Roubo/Furto de Veículos SSP/RS - 
                            O presente sistema foi desenvolvido com o objetivo de difundir rapidamente, em todo o Estado do Rio Grande do Sul, as consultas por placa dos veículos envolvidos em ocorrências de FURTO e/ou ROUBO de veículos.
                            Dessa forma, por conta da agilidade na difusão das informações recomenda-se cautela extrema na abordagem policial, tendo em vista a suscetibilidade do sistema a registros indevidos.
                            As informações disponibilizadas são oriundas dos serviços prestados pela SSP através dos fones 190 e registro de furtos de veículos da Polícia Civil, com o objetivo de agilizar e aumentar a recuperação de veículos em situação de furto e/ou roubo.
                        " aria-describedby="popover988860"  data-bs-trigger="hover focus"
                    ><path fill="#001eff" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                </div>
            </div>`;
        let parser = new DOMParser();
        let doc = parser.parseFromString(htmlString, 'text/html');
        _iframeProcergsElement = doc.body.firstChild;
    }
    return _iframeProcergsElement;
}

function showDivProcergs(idDivProcergs) {
    let div = document.getElementById(idDivProcergs);
    if (div) {
        div.style.display = div.style.display === 'none' ? '' : 'none';
        if (div.style.display !== 'none' && !div.querySelector('.consultaroubo')) {
            div.appendChild(loadIframe());
            let iframe = div.querySelector('#consultaroubo-iframe');
            createPopOver();
        }
    }
}
document.showDivProcergs = showDivProcergs;

function showGenericDiv(id) {
    let div = document.getElementById(id);
    if (div)
        div.style.display = div.style.display === 'none' ? '' : 'none';
}
document.showGenericDiv = showGenericDiv;

// Analisa o HTML e cria os Popovers
async function createPopOver() {
    if (!_bootstrap) 
        await loadBootstrap();
    let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new _bootstrap.Popover(popoverTriggerEl);
    });
}

//Crias os Toasts
async function createToast(alert) {
    if (alert == null || alert.length == 0) return;
    if (!_bootstrap) 
        await loadBootstrap();
    let toastContainer = document.getElementById('idToastAlert');
    let toast = document.createElement('div');

    toast.classList.add('toast', 'fs-4');
    toast.style.minWidth = '550px';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.setAttribute('data-bs-autohide', 'true');
    
    //defina multiplos onclick
    toast.addEventListener('click', () => showModalAlertas(true));
    toast.addEventListener('click', handleSvgClick);

    toast.innerHTML = `
        <div class="toast-header text-bg-warning">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="21" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg>
            <strong class="ps-3 me-auto">Atenção! Registro de Passagem</strong>
            
            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="24" viewBox="0 0 384 512" style="cursor: pointer;" onclick="handleSvgClick(event)"
            data-bs-dismiss="toast" aria-label="Close"
            ><path fill="#000000" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </div>
        <div class="toast-body bg-white">
            ${alert.plate} - ${alert.id_situacao}
        </div>
    `;

    toastContainer.appendChild(toast);
    let bootstrapToast = new _bootstrap.Toast(toast);
    bootstrapToast.show();
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

async function createGenericToast(toastType, title, description) {
    if (!_bootstrap) 
        await loadBootstrap();
    let toastContainer = document.getElementById('idToastAlert');
    let toast = document.createElement('div');

    toast.classList.add('toast', 'fs-4');
    toast.style.minWidth = '550px';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.setAttribute('data-bs-autohide', 'true');

    let headerClass;
    switch (toastType) {
        case enumToast.SUCCESS: headerClass = 'text-bg-success';    break;
        case enumToast.ERROR:   headerClass = 'text-bg-danger';     break;
        case enumToast.WARNING: headerClass = 'text-bg-warning';    break;
        case enumToast.INFO:    headerClass = 'text-bg-info';       break;
        default:                headerClass = 'text-bg-warning';
    }

    toast.innerHTML = `
        <div class="toast-header ${headerClass}">
            ${getSvg(toastType)}
            <strong class="ps-3 me-auto">${title}</strong>
            
            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="24" viewBox="0 0 384 512" style="cursor: pointer;" onclick="handleSvgClick(event)"data-bs-dismiss="toast" aria-label="Close"
            ><path fill="#000000" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </div>
        <div class="toast-body bg-white">
            ${description}
        </div>
    `;

    toastContainer.appendChild(toast);
    let bootstrapToast = new _bootstrap.Toast(toast);
    bootstrapToast.show();
}

function getSvg(toastType) {
    let svg;
    switch (toastType) {
        case enumToast.SUCCESS:
            svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>';
            break;
        case enumToast.ERROR:
            svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>';
            break;
        case enumToast.WARNING:
            svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>';
            break;
        case enumToast.INFO:
            svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="18" viewBox="0 0 384 512"><path d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80V416H272v16c0 44.2-35.8 80-80 80z"/></svg>'
            break;
        // Adicione mais casos conforme necessário
        default:
            svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="18" viewBox="0 0 384 512"><path d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80V416H272v16c0 44.2-35.8 80-80 80z"/></svg>'
    }
    return svg;
}

function showNewAlertsToast(alerts) {
    if (alerts != null && alerts.length > 0) {
        alerts.forEach(alert => {
            createToast(alert);
        });
    }
    alerts.sort((a, b) => new Date(a.data_captura) - new Date(b.data_captura));
    updateModal(alerts);
    _alertList.push(...alerts);
    _alertList.sort((a, b) => new Date(a.data_captura) - new Date(b.data_captura));
    updateCountAlertIcon();
}

function updateCountAlertIcon() {
    let countAlertIcon = document.getElementById('idCountAlertIcon');
    if (countAlertIcon) 
        countAlertIcon.innerHTML = _alertList.length > 0 ? `${_alertList.length}` : '0';
}

async function updateOCRValidator(event, idAlert, idTypeOCRValidator) {
    await putOCRValidator(idAlert, idTypeOCRValidator);
    deleteAlertRemoveDiv(event, idAlert, true);
}
document.updateOCRValidator = updateOCRValidator;

async function deleteAlertRemoveDiv(event, id, deleteAlert) {
    if (deleteAlert)
        await removerAlerta(id);
    // Encontre o elemento card mais próximo
    let cardElement = event.target.closest('.card.mt-2.mb-1');
    // Oculte o popover
    let popoverElement = event.target.closest('[data-bs-toggle="popover"]');
    if (popoverElement) {
        let popoverInstance = _bootstrap.Popover.getInstance(popoverElement);
        if (popoverInstance)
            popoverInstance.hide();
    }

    // Remova o card do DOM
    if (cardElement) 
        cardElement.remove();

    // Remova o alerta da lista de alertas
    _alertList = _alertList.filter(alert => alert.ID !== id);

    // Se a lista de alertas estiver vazia, exiba um card informando que não há alertas disponíveis
    if (_alertList.length === 0){
        let modalElement = document.getElementById('idAlertModal');
        if (modalElement) {
            let modalBodyInput = modalElement.querySelector('.modal-body');
            
            modalBodyInput.innerHTML = `
                    <div class="card mt-2 mb-1">
                        <div class="card-body bg-warning-subtle p-1" style="border-radius: 5px">
                            <div class="row">
                                <div class="col-auto">
                                    <p class="fs-4 m-0">Nenhum alerta disponível</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        }
    }
    updateCountAlertIcon(); 
}
document.deleteAlertRemoveDiv = deleteAlertRemoveDiv;

// Fecha o Toast(X) sem abrir modal
function handleSvgClick(event) {
    event.stopPropagation();
    var toastElement = event.target.closest('.toast');
    var toastInstance = new _bootstrap.Toast(toastElement);
    toastInstance.hide();
}
document.handleSvgClick = handleSvgClick;

//Carrega informações do usuario e produto em uso
async function loadUserInfo() {
    if (dashboard && dashboard.dashboardProps && Array.isArray(dashboard.dashboardProps) && dashboard.dashboardProps.length > 0) {
        let product = dashboard.dashboardProps.find(prop => prop.name === "user_product");
        let city = dashboard.dashboardProps.find(prop => prop.name === "user_city");
        let email = dashboard.dashboardProps.find(prop => prop.name === "user.emailAddress");
        if (product && product.value && city && city.value && typeof product.value === 'string' && typeof city.value === 'string') {
            _user.product = product.value.split(',');
            _user.email = email.value;
            if (Number.isFinite(Number(city.value)))
                _user.city = Number(city.value)

            if (_user.product.includes('Safe Way') && _user.city >= 0)
                _user.alertEnabled = true;
        }
    }
}

async function init() {
    // await loadUserInfo();
    // if (_user.alertEnabled === false)
    //     return;
    _user = {
        alertEnabled: true,
        city: 0,
        product: 'Safe Way',
        email: "testeJS@testeJS.com"
    }
    await getAlerts();
    criarElementosHTML();
    await showModalAlertas(false);
    loadBootstrapTab();
    createHTMLBlackListList();
    createHTMLBlackListForm();
    loadBlackList(_blackListMock);

    createToast();
    updateCountAlertIcon();
    showLoading('idSpinnerSearchPlacas', false);
    //setInterval(getAlerts, 60000);
}

// _alertList = [
//     {
//         id: 1,
//         plate: "ABC1234",
//         codigoSituacao: "Situação 1",
//         data_captura: new Date().getTime(), // timestamp atual
//         cnpj: "88254875000160",
//         url: "192_168_28_138_03022024_180138_1_DDG4761.jpg",
//         Cidade: "Porto Alegre",
//         Ponto: "Ponto 1",
//         Direcao: "Norte",
//         address: "Rua Exemplo, 123"
//     },
//     {
//         id: 2,
//         plate: "XYZ9876",
//         codigoSituacao: "Situação 2",
//         data_captura: new Date().getTime(), // timestamp atual
//         cnpj: "89814693000160",
//         url: "192_168_29_126_03022024_180255_1_NYR9868.jpg",
//         Cidade: "São Paulo",
//         Ponto: "Ponto 2",
//         Direcao: "Sul",
//         address: "Avenida Exemplo, 456"
//     }
// ];

//////////////////////////////////////////////BlackList//////////////////////////////////////////////
var _listBlackList = null;
function loadBootstrapTab() {
    const tabElement = document.getElementById('idNavAlerts');

    let triggerTabList = document.querySelectorAll('#idNavAlerts button');
    triggerTabList.forEach((triggerEl) => {
        let tab = new _bootstrap.Tab(triggerEl);
        // Click para alterar as abas
        triggerEl.addEventListener('click', function (event) {
            event.preventDefault();
            tab.show();
        });
    });
}

function createHTMLBlackListList() {
    let tabPane = document.getElementById('idBlackListPane');
    if (tabPane) {
        tabPane.innerHTML = `
            <div class="card mt-2 mb-1">
                <div class="card-body bg-warning-subtle p-1" style="border-radius: 5px">
                    <div class="row">
                        <div class="col-auto">
                            <p class="fs-4 m-0">Black List</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function createHTMLBlackListForm() {
    let tabPane = document.getElementById('idBlackListPane');
    if (tabPane) {
        tabPane.innerHTML = `
            <div class="container" id="idDivCadastroBlackList" style="display: none;">
                <h2>Cadastro do Alerta</h2>
                <form id="idFormBlackList">
                    <input type="hidden" id="idOculto" name="id">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="placa" class="form-label">Placa <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="placa" name="placa" required maxlength="7" oninput="this.value = this.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase()">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="data" class="form-label">Data <span class="text-danger">*</span></label>
                            <input type="date" class="form-control" id="data" name="data" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="numeroRegistro" class="form-label">Número do Registro <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="numeroRegistro" name="numeroRegistro" required maxlength="20" oninput="this.value = this.value.toUpperCase()">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="codigoOcorrencia" class="form-label">Código da Ocorrência</label>
                            <input type="text" class="form-control" id="codigoOcorrencia" name="codigoOcorrencia" maxlength="20" oninput="this.value = this.value.toUpperCase()">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="descricao" class="form-label">Descrição <span class="text-danger">*</span></label>
                        <textarea class="form-control" id="descricao" name="descricao" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="observacao" class="form-label">Observação</label>
                        <textarea class="form-control" id="observacao" name="observacao"></textarea>
                    </div>
                    <div class="row">
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary" id="idBtnSubmitFormNewBlackList">Criar</button>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-outline-primary" onclick="hideForm(true); showElement(['idBtnDeleteAlertBlack', 'idDivCadastroBlackList', 'idDivListAllBlackList']);">Voltar</button>
                        </div>
                        <div class="col-auto">
                            <button type="button" id="idBtnDeleteAlertBlack" class="btn btn-outline-danger" onclick="showElement(['idDivDeleteConfirmation'])" style="display: none;">Excluir</button>
                        </div>
                        <div class="col-auto">
                            <!-- Spinner DGT -->
                            <div class="row" id="idSpinnerSearchPlacas" >
                                <img class="rotate-image" src="https://cdnprojetos.s3.sa-east-1.amazonaws.com/imgLoading.png" style="width: 60px;">
                            </div>
                            <!-- Spinner DGT -->
                        </div>
                        <div id="idDivDeleteConfirmation" class="" style="display: none;">
                            <p class="text-center">Você tem certeza de que deseja excluir este alerta?</p>
                            <div class="row justify-content-center">
                                <div class="col-auto">
                                    <button type="button" class="btn btn-outline-primary" onclick="showGenericDiv('idDivDeleteConfirmation')">Cancelar</button>
                                </div>
                                <div class="col-auto">
                                    <button type="button" class="btn btn-danger" id="idBtnDeletePermanentAlertBlack" onclick="deleteAlertBlack()">Excluir Permanentemente</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="container" id="idDivListAllBlackList">
                <div class="row">
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary" onclick="hideForm(false); createAlertElements(); resetForm('idFormBlackList'); showElement(['idDivCadastroBlackList', 'idDivListAllBlackList']);">Criar Alerta</button>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Placa</th>
                            <th scope="col">Data</th>
                            <th scope="col">Registro</th>
                            <th scope="col">Ocorrência</th>
                            <th scope="col">Descrição</th>
                            <th scope="col" class="text-end">Ação</th>
                        </tr>
                    </thead>
                    <tbody id="idBlakListTableBody">
                        <!-- JavaScript -->
                    </tbody>
                </table>
            </div>
        `
        let form = document.getElementById('idFormBlackList');
        form.addEventListener('submit', function(event) {
            disableBtn(true, "idBtnSubmitFormNewBlackList"); // Desabilita o botão de envio
            showLoading('idSpinnerSearchPlacas', true);

            event.preventDefault(); // Impede o recarregamento da página

            let formData = new FormData(this); // Cria um objeto FormData com os dados do formulário
            let plate = formData.get('placa').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
            if (plate.length < 7){
                disableBtn(false, "idBtnSubmitFormNewBlackList"); // Habilita o botão de envio
                return createGenericToast(enumToast.INFO, "Atenção!", "Placa inválida, tente novamente!");
            }
            let alert = {
                id: formData.get('id') !== "" ||  formData.get('id') > 0 ? formData.get('id') : null,
                plate: formData.get('placa'),
                date: formData.get('data'),
                numberRegister: formData.get('numeroRegistro'),
                codeOccurence: formData.get('codigoOcorrencia'),
                description: formData.get('descricao'),
                observation: formData.get('observacao'),
                createUserEmail: _user.email,
                idCity: _user.city
            };
            // chama a função que cria o alerta
            createAlertBlack(alert)
            .finally(() => {
                disableBtn(false, "idBtnSubmitFormNewBlackList"); // Habilita o botão de envio
            });
        });

    }
}

function disableBtn(bool, id) {
    let btn = document.getElementById(id);
    if (btn)
        btn.disabled = bool;
}

function resetForm(formId) {
    let form = document.getElementById(formId);
    if (form)
        form.reset();
}
document.resetForm = resetForm;

function hideForm(bool) {
    let form = document.getElementById('idFormBlackList');
    if (form) {
        if (bool)
            form.noValidate = true; // Desativa a validação do formulário
        else
            form.noValidate = false; // Ativa a validação do formulário
    }
}
document.hideForm = hideForm;

function showElement(listNames) {
    //closeDivVerifyDelete();
    listNames.forEach(id => {
        let div = document.getElementById(id);
        if (div) {
            if (div && div.style.display === '')
                div.style.display = 'none';
            else
                div.style.display = '';
        }
    });
}
document.showElement = showElement;

function createAlertBlack(obj) {
    let method = 'POST';
    if (obj.id !== null)
        method = 'PUT';

    return fetch('https://sua-api.com/blacklist', { // Substitua pela URL da sua API
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'sua-api-key'
        },
        body: JSON.stringify(alert)
    })
    .then(response => {
        if (!response.ok)
            throw new Error('Erro na resposta da API');
        return response.json();
    })
    .then(data => {

        let btn = document.getElementById('idBtnSubmitFormNewBlackList');
        if (btn && obj.id !== null)
            btn.innerHTML = 'Criar';
        createGenericToast(enumToast.SUCCESS, "Sucesso!", "Novo alerta da Black List criado!");
        showLoading('idSpinnerSearchPlacas', false);
    })
    .catch(error => {
        if(obj.id !== null)
            createGenericToast(enumToast.ERROR, "Atenção!", "Erro ao atualizar alerta da Black List, tente novamente!");
        else
            createGenericToast(enumToast.ERROR, "Atenção!", "Erro ao criar alerta da Black List, tente novamente!");
        showLoading('idSpinnerSearchPlacas', false);
    });
}

function deleteAlertBlack() {
    let id = document.getElementById('idOculto').value;
    if (!id)
        return;
    disableBtn(true, "idBtnSubmitFormNewBlackList");
    disableBtn(true, "idBtnDeletePermanentAlertBlack");

    showLoading('idSpinnerSearchPlacas', true);
    fetch('https://sua-api.com/blacklist', { // Substitua pela URL da sua API
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'sua-api-key'
    },
    body: JSON.stringify({ id: Number(id) })
    })
    .then(response => {
        if (!response.ok)
        throw new Error('Erro na resposta da API');
    return response.json();
    })
    .then(data => {
        let btn = document.getElementById('idBtnSubmitFormNewBlackList');
        if (btn)
            btn.innerHTML = 'Criar';

        showLoading('idSpinnerSearchPlacas', false);
        createGenericToast(enumToast.SUCCESS, "Sucesso!", "O alerta foi removido da Black List!");
        showElement(['idBtnDeleteAlertBlack', 'idDivCadastroBlackList', 'idDivListAllBlackList']); // irá ocultar o botão de excluir
        deletRowTableBlackList(id);
        hideForm(true);
        //showGenericDiv('idDivCadastroBlackList'); 
        //showGenericDiv('idDivListAllBlackList');
    })
    .catch(error => {
        disableBtn(false, "idBtnSubmitFormNewBlackList");
        disableBtn(false, "idBtnDeletePermanentAlertBlack");
        createGenericToast(enumToast.ERROR, "Atenção!", "Erro ao remover alerta da Black List, tente novamente!");
        showLoading('idSpinnerSearchPlacas', false);
    });
}
document.deleteAlertBlack = deleteAlertBlack;

function createListBlackListHTML(list) {
    let tableBody = document.getElementById('idBlakListTableBody');
    if (tableBody)
        list.forEach(alert => {
            let rowHtml = `
                <tr>
                    <td style="display: none;">${alert.id}</td>
                    <td>${alert.plate}</td>
                    <td>${_dateTime.stringDateDDMMYYYY(alert.date)}</td>
                    <td>${alert.numberRegister}</td>
                    <td>${alert.codeOccurence}</td>
                    <td>${(alert.description.length > 72) ? alert.description.substring(0, 72) + "..." : alert.description}</td>
                    <td class="text-end">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512" onclick="editAlertBlack(${alert.id}); showGenericDiv('idDivCadastroBlackList'); showGenericDiv('idDivListAllBlackList');" style="cursor: pointer;"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
                    </td>
                </tr>
            `;
        
            tableBody.innerHTML += rowHtml;
        });
    
}

function addNewAlert(obj) {
    _listBlackList.push(obj);
    createListBlackListHTML(obj);
}

function loadBlackList(){
    createListBlackListHTML(_blackListMock);
}

function editAlertBlack(idAlertBlack) {
    let form = document.getElementById('idFormBlackList');
    let alert = _blackListMock.find(alert => alert.id === idAlertBlack);
    if (form && alert) {
        form.id.value = alert.id;
        form.placa.value = alert.plate;
        form.data.value = alert.date;
        form.numeroRegistro.value = alert.numberRegister;
        form.codigoOcorrencia.value = alert.codeOccurence;
        form.descricao.value = alert.description;
        form.observacao.value = alert.observation;
    }
    let btn = document.getElementById('idBtnSubmitFormNewBlackList');
    if (btn)
        btn.innerHTML = 'Atualizar';
    let btnDelete = document.getElementById('idBtnDeleteAlertBlack');
    if (btnDelete)
        btnDelete.style.display = '';
    let divDelete = document.getElementById('idDivDeleteConfirmation');
    if (divDelete)
        divDelete.style.display = 'none';
}

function deletRowTableBlackList(id) {
    // Obtenha todas as linhas da tabela
    let linhas = document.getElementById('idBlakListTableBody').rows; // Substitua 'tabelaId' pelo ID da sua tabela

    for (let i = 0; i < linhas.length; i++) {
        // Obtenha todas as células da linha
        let celulas = linhas[i].cells;

        for (let j = 0; j < celulas.length; j++) {
            // Verifique se a célula contém o ID
            if (celulas[j].textContent === id) {
                // Remova a linha
                linhas[i].remove();
                break;
            }
        }
    }
}

// function closeDivVerifyDelete() {
//     let div = document.getElementById('idDivDeleteConfirmation');
//     if (div)
//         div.style.display = 'none';
// }

function createAlertElements() {
    let btnSend = document.getElementById('idBtnSubmitFormNewBlackList');
    if (btnSend)
        btnSend.innerHTML = 'Criar';
    let btnDelete = document.getElementById('idBtnDeleteAlertBlack');
    if (btnDelete)
        btnDelete.style.display = 'none';
    let divDelete = document.getElementById('idDivDeleteConfirmation');
    if (divDelete)
        divDelete.style.display = 'none';
}
document.createAlertElements = createAlertElements;

function checkFirstDivBlackList() {
    let cadDiv = document.getElementById('idDivCadastroBlackList');
    if (cadDiv && cadDiv.style.display === '') {
        let btnDelete = document.getElementById('idBtnDeleteAlertBlack');
        if (btnDelete && btnDelete.style.display === '')
            showElement(['idBtnDeleteAlertBlack']);
        hideForm(true);
        showElement(['idDivCadastroBlackList', 'idDivListAllBlackList']);
        //showGenericDiv('idDivListAllBlackList');
    }
}
document.checkFirstDivBlackList = checkFirstDivBlackList;
//////////////////////////////////////////////BlackList//////////////////////////////////////////////

//debugger;
setTimeout(function() {
    init();
}, 1000);