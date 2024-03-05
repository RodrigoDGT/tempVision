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
    newDateForKlipText: function(dateString) {
        let date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', this.optionsDate).split('/').reverse().join('/') + ' ' + date.toLocaleTimeString('pt-BR', this.optionsTime);
    },
    convertTimesTamp: function(dateString) {
        let date = new Date(dateString);
        isoString = date.toISOString();
        isoString = isoString.split('-').join('/');
        return isoString.slice(0,10).split('/').reverse().join('/') + " às " + isoString.slice(11,16);
    },
    newDateForKlipHours: function(hh, mm) {
        let date = new Date();
        date.setHours(hh, mm);
        return date.toLocaleDateString('pt-BR', this.optionsDate).split('/').reverse().join('/') + ' ' + date.toLocaleTimeString('pt-BR', this.optionsTime);
    },
}

const env = {
    webSocket: {
        URL: "wss://an33qks6lj.execute-api.sa-east-1.amazonaws.com/api_v3",
        "x-api-key": "5tCLdR7cAk5hW491VGqaq6VxVVubbxBF4psn23X1",
    },
    bootstrap: {
        table: 'idTableSearch',
        placa: "inputPlaca",
        dateInit: "inputInicio",
        dateEnd: "inputFim",
        cidade: "dropdownCidades", //<button id..
        ponto: "dropdownPontos",
        endereco: "dropdownEndereco",
        brand: "dropdownBrand",
        model: "dropdownModel",
        color: "dropdownColor",
        city: "dropdownCity",
        situation: "dropdownSituation",
        uf: "dropdownUF",
        vehicleType: "dropdownVehicleType",
        menuList: {
            cidade: "idDropdownCidades", //div class="dropdown"
            ponto: "idDropdownPontos",
            endereco: "idDropdownEndereco",
            brand: "idDropdownBrand",
            model: "idDropdownModel",
            color: "idDropdownColor",
            city: "idDropdownCity",
            situation: "idDropdownSituation",
            uf: "idDropdownUF",
            vehicleType: "idDropdownVehicleType",
        },
    },
    groupType: {
        brand: 2,
        model: 3,
        color: 7,
        city: 8,
        situation: 9,
        uf: 10,
        vehicleType: 11,
    }
}
var _websocket;
var _bootstrap = null; // Framework Bootstrap
var _initialValues = {}; // Identificar se houve alteração nos valores
var _body = {
    placa: "",
    cidade: ["_all_"],
    ponto: ["_all_"],
    endereco: ["_all_"],
    marca: ["_all_"],
    modelo: ["_all_"],
    cor: ["_all_"],
    municipio: ["_all_"],
    situacao: ["_all_"],
    uf: ["_all_"],
    tipoVeiculo: ["_all_"],
    startDate: _dateTime.newDateForKlipHours(0, 0),
    endDate: _dateTime.newDateForKlipHours(23, 59),
}
var _resultSearch = null;
var _resultFiltros = null;
var _resultFiltrosCameras = null;

// fazer a requisição para obter a lista de placas
function connectWebSocket() {
    _websocket = new WebSocket(env.webSocket.URL + "?x-api-key=" + env.webSocket["x-api-key"]);
}
function searchPlatesInWebSocket() {
    obj = {
      action: "getData",
      message: JSON.stringify(_body)
    }
    console.log(obj)
    // Verifica se a conexão WebSocket está aberta
    if (_websocket.readyState === WebSocket.OPEN) {
      // Converte o objeto em uma string JSON e o envia
      _websocket.send(JSON.stringify(obj));
    } else {
      // Se a conexão não estiver aberta, aguarda até que esteja para enviar o objeto
      _websocket.onopen = function (event) {
        _websocket.send(JSON.stringify(obj));
      };
    }
}
async function returnResponsoWebSocket() {
    return new Promise((resolve, reject) => {
        // Define um manipulador de eventos para a mensagem do WebSocket
        _websocket.onmessage = function (event) {
            // Converte a mensagem de volta em um objeto
            let obj = JSON.parse(event.data);

            if (Array.isArray(obj) && obj.length) {
            // Resolve a Promise com o objeto da mensagem
                resolve(obj);
            }

            if(obj && typeof obj === 'object' && obj.message && obj.message === "Internal server error") {
                reject(obj.error);
            }
        };
    });
}

async function getFiltros() {
    let url = "https://b9qc7z5jbf.execute-api.sa-east-1.amazonaws.com/v1/pesquisa"
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': '5tCLdR7cAk5hW491VGqaq6VxVVubbxBF4psn23X1'
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let result = await response.json();
    return result;
}
// fazer a requisição para obter a lista de placas
async function getPlacas() {
    console.log(_body)
    let url = "https://b9qc7z5jbf.execute-api.sa-east-1.amazonaws.com/v1/pesquisa"
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': '5tCLdR7cAk5hW491VGqaq6VxVVubbxBF4psn23X1'
        },
        body: JSON.stringify({body: _body})
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let result = await response.json();
    return JSON.parse(result);
}

//Funções para criar elementos do bootstrap como Modal, Dropdown, etc/////
async function loadBootstrap() {
    return new Promise(function(resolve, reject) {
        require(['bootstrap'], function(bootstrap) {
            _bootstrap = bootstrap;
            resolve();
        });
    });
}

async function loadFilters() {
    _resultFiltros = await getFiltros();
    _resultFiltros.filtrosPlacas = groupforPrefix(JSON.parse(_resultFiltros.filtrosPlacas));
    _resultFiltros.filtrosCameras = JSON.parse(_resultFiltros.filtrosCameras);
}
async function createAllDropdowns() {
    await createDropdownElement('cidade', "filtrosCameras");
    await createDropdownElement('ponto', "filtrosCameras");
    await createDropdownElement('endereco', "filtrosCameras");
    createDropdownItemsCameras(); 
    await createDropdownElement('brand', "filtrosPlacas");
    await createDropdownElement('model', "filtrosPlacas");
    await createDropdownElement('color', "filtrosPlacas");
    await createDropdownElement('city', "filtrosPlacas");
    await createDropdownElement('situation', "filtrosPlacas");
    await createDropdownElement('uf', "filtrosPlacas");
    await createDropdownElement('vehicleType', "filtrosPlacas");
}

async function createDropdownElement(idName, folderName) {
    let dropdownElement = document.getElementById(env.bootstrap[idName]);
    return await createBootstrapDropdown(dropdownElement, idName, folderName);
}

async function createBootstrapDropdown(dropdownElement, idName, folderName) {
    // Carrega o framework se ainda não estiver carregado
    if (!_bootstrap) 
        await loadBootstrap();
    if (!dropdownElement) 
        return;
    let dropdown = new _bootstrap.Dropdown(dropdownElement);
    dropdownElement.addEventListener('shown.bs.dropdown', event => {
        var dropdownMenu = dropdownElement.nextElementSibling;
        // Localiza o campo de entrada dentro do dropdown
        var inputSearch = dropdownMenu.querySelector('input');
        if (inputSearch) {
            // Limpa o campo de entrada quando o dropdown é fechado
            inputSearch.value = '';
            filterSelectOptions({target: inputSearch});
        }
    });
    createDropdownItems(idName, folderName);
}

function createDropdownItems(idName, folderName) {
    let idTypeGroup = env.groupType[idName];
    // Obter o elemento dropdown
    let dropdown = document.getElementById(env.bootstrap.menuList[idName]);

    // Obter a lista dentro do dropdown
    let ul = dropdown.getElementsByTagName('ul')[0];

    // Limpar a lista existente
    while (ul.firstChild)
        ul.removeChild(ul.firstChild);

    // Adicionar o elemento de pesquisa
    let li = document.createElement('li');
        li.className = 'sticky-top';
        li.innerHTML = '<input type="text" class="form-control" id="inputSearch" maxlength="50" oninput="filterSelectOptions(event)" placeholder="Pesquise.." autocomplete="off">';
        ul.appendChild(li);

    // Adicionar opção Todos
    li = document.createElement('li');
    li.setAttribute('onclick', `changeCheckbox(this, '${idName}')`);
    li.style.cursor = 'pointer';
    li.innerHTML = `<span class="dropdown-item"><input type="checkbox" style="margin-right: 5px;" value="_all_">Todos</span>`;
    ul.appendChild(li);

    let itensMenu;
    if (_resultFiltros && folderName === "filtrosPlacas" && _resultFiltros[folderName] && _resultFiltros[folderName].length > 0)
        itensMenu = _resultFiltros[folderName].filter(item => item.idTypeGroup === idTypeGroup && item.title !== null && item.title.length > 0);
    else
        return;

    itensMenu.sort((a, b) => a.title.localeCompare(b.title));

    // Adicionar novos itens à lista
    for (let i = 0; i < itensMenu.length; i++) {
        li = document.createElement('li');
        li.setAttribute('onclick', `changeCheckbox(this, '${idName}')`);
        li.style.cursor = 'pointer';
        li.innerHTML = `<span class="dropdown-item"><input type="checkbox" style="margin-right: 5px;" value="${itensMenu[i].id}" data-prefixo="${itensMenu[i].prefixo}">${itensMenu[i].title}</span>`;
        ul.appendChild(li);
    }
}

function createDropdownItemsCameras() {
    // Obter o elemento dropdown
    let dropdownCidade = document.getElementById(env.bootstrap.menuList.cidade);
    // Obter a lista dentro do dropdown
    let ul = dropdownCidade.getElementsByTagName('ul')[0];
    // Limpar a lista existente
    while (ul.firstChild)
        ul.removeChild(ul.firstChild);

    let cidades = [];
    let pontos = [];
    let enderecos = [];
    let selectCidades = [];
    let selectPontos = [];
    let selectEnderecos = [];

    _resultFiltros.filtrosCameras.forEach(cidade => {
        cidades.push({id: cidade.id, title: cidade.name.replace(/_/g, ' ')});
        selectCidades.push({id: cidade.id, title: cidade.name.replace(/_/g, ' ')});
        cidade.points.forEach(ponto => {
            ponto.name = ponto.name.replace(/_/g, ' ');

            pontos.push({id: cidade.id, title: ponto.name});
            enderecos.push({id: cidade.id, title: ponto.tc_point_reader[0].address});

            if (selectPontos.filter(p => p.title === ponto.name).length === 0)
                selectPontos.push({id: cidade.id, title: ponto.name});

            if (selectEnderecos.filter(e => e.title === ponto.tc_point_reader[0].address).length === 0)
                selectEnderecos.push({id: cidade.id, title: ponto.tc_point_reader[0].address});
        });
    });
    _resultFiltrosCameras = {cidades, pontos, enderecos};

    createItensFilterCameras(selectCidades, "cidade");
    createItensFilterCameras(selectPontos, "ponto");
    createItensFilterCameras(selectEnderecos, "endereco");
}
function createItensFilterCameras(lista, idName) {
    let dropdownCidade = document.getElementById(env.bootstrap.menuList[idName]);
    let ul = dropdownCidade.getElementsByTagName('ul')[0];
    while (ul.firstChild)
        ul.removeChild(ul.firstChild);

    // Adicionar o elemento de pesquisa
    let li = document.createElement('li');
        li.className = 'sticky-top';
        li.innerHTML = '<input type="text" class="form-control" id="inputSearch" maxlength="50" oninput="filterSelectOptions(event)" placeholder="Pesquise.." autocomplete="off">';
        ul.appendChild(li);

    // Adicionar opção Todos
    li = document.createElement('li');
    li.setAttribute('onclick', `changeCheckbox(this, '${idName}')`);
    li.style.cursor = 'pointer';
    li.innerHTML = `<span class="dropdown-item"><input type="checkbox" style="margin-right: 5px;" value="_all_">Todos</span>`;
    ul.appendChild(li);

    lista.sort((a, b) => a.title.localeCompare(b.title));

    // Adicionar novos itens à lista
    for (let i = 0; i < lista.length; i++) {
        li = document.createElement('li');
        li.setAttribute('onclick', `changeCheckbox(this, '${idName}')`);
        li.style.cursor = 'pointer';
        li.innerHTML = `<span class="dropdown-item"><input type="checkbox" style="margin-right: 5px;" value="${lista[i].id}">${lista[i].title}</span>`;
        ul.appendChild(li);
    }
}

function groupforPrefix(lista) {
    if (!Array.isArray(lista)) 
        throw new Error('O argumento deve ser uma lista.');

    for (let i = 0; i < lista.length; i++) {
        if (typeof lista[i] !== 'object' || lista[i] === null) 
            throw new Error('Todos os itens da lista devem ser objetos.');

        if (!lista[i].hasOwnProperty('title') || typeof lista[i].title !== 'string') 
            throw new Error('Cada objeto deve ter uma propriedade de título que é uma string.');

        let prefixo = lista[i].title.split(' ')[0];
        lista[i].prefixo = prefixo;
    }

    return lista;
}

//Funções para criar elementos do bootstrap como Modal, Dropdown, etc/////

//Definir o valor inicial dos inputs no klipfolio//////////////////////////////////////
function loadingDefaultValues() {
    let boots_dateEnd = document.getElementById(env.bootstrap.dateEnd);
    let boots_dateInit = document.getElementById(env.bootstrap.dateInit);
    let boots_cidade = document.getElementById(env.bootstrap.menuList.cidade);
    let boots_ponto = document.getElementById(env.bootstrap.menuList.ponto);
    let boots_endereco = document.getElementById(env.bootstrap.menuList.endereco);
    //novos
    let boots_brand = document.getElementById(env.bootstrap.menuList.brand);
    let boots_model = document.getElementById(env.bootstrap.menuList.model);
    let boots_color = document.getElementById(env.bootstrap.menuList.color);
    let boots_city = document.getElementById(env.bootstrap.menuList.city);
    let boots_situation = document.getElementById(env.bootstrap.menuList.situation);
    let boots_uf = document.getElementById(env.bootstrap.menuList.uf);
    let boots_vehicleType = document.getElementById(env.bootstrap.menuList.vehicleType);
    
    if (boots_cidade) {
        let checkboxElement = boots_cidade.querySelectorAll('input[type="checkbox"]');
        checkboxElement[0].checked = true
        changeDropdownTitleOnSelect(boots_cidade);
    }
    if (boots_ponto) {
        let checkboxElement = boots_ponto.querySelectorAll('input[type="checkbox"]');
        checkboxElement[0].checked = true
        changeDropdownTitleOnSelect(boots_ponto);
    }
    if (boots_endereco) {
        let checkboxElement = boots_endereco.querySelectorAll('input[type="checkbox"]');
        checkboxElement[0].checked = true
        changeDropdownTitleOnSelect(boots_endereco);
    }
    if (boots_brand) {
        let checkboxElement = boots_brand.querySelectorAll('input[type="checkbox"]');
        checkboxElement[0].checked = true
        changeDropdownTitleOnSelect(boots_brand);
    }
    if (boots_model) {
        let checkboxElement = boots_model.querySelectorAll('input[type="checkbox"]');
        checkboxElement[0].checked = true
        changeDropdownTitleOnSelect(boots_model);
    }
    if (boots_color) {
        let checkboxElement = boots_color.querySelectorAll('input[type="checkbox"]');
        checkboxElement[0].checked = true
        changeDropdownTitleOnSelect(boots_color);
    }
    if (boots_city) {
        let checkboxElement = boots_city.querySelectorAll('input[type="checkbox"]');
        checkboxElement[0].checked = true
        changeDropdownTitleOnSelect(boots_city);
    }
    if (boots_situation) {
        let checkboxElement = boots_situation.querySelectorAll('input[type="checkbox"]');
        checkboxElement[0].checked = true
        changeDropdownTitleOnSelect(boots_situation);
    }
    if (boots_uf) {
        let checkboxElement = boots_uf.querySelectorAll('input[type="checkbox"]');
        checkboxElement[0].checked = true
        changeDropdownTitleOnSelect(boots_uf);
    }
    if (boots_vehicleType) {
        let checkboxElement = boots_vehicleType.querySelectorAll('input[type="checkbox"]');
        checkboxElement[0].checked = true
        changeDropdownTitleOnSelect(boots_vehicleType);
    }
    if (boots_dateInit) 
        boots_dateInit.value = _dateTime.formatToBootrstrap(_dateTime.newDateForKlipHours(0, 0));
    if (boots_dateEnd) 
        boots_dateEnd.value = _dateTime.formatToBootrstrap(_dateTime.newDateForKlipHours(23, 59));
}
//Definir o valor inicial dos inputs no klipfolio//////////////////////////////////////

//////////Quando houver alteração nos Select dos DropDown/////////////////////
function changeCheckbox(element, variableName) {
    let checkbox = element.querySelector('input[type="checkbox"]');
    if (checkbox) {
        checkbox.checked = !checkbox.checked;

        if (variableName === "model") {
            let prefixoSelecionado = checkbox.dataset.prefixo;
            let dropdown = document.getElementById(env.bootstrap.menuList[variableName]);
            let ul = dropdown.getElementsByTagName('ul')[0];
            let checkboxes = ul.querySelectorAll('input[type="checkbox"]');
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].dataset.prefixo === prefixoSelecionado) {
                    checkboxes[i].checked = checkbox.checked;
                }
            }
        }
        
        changeDropdownTitleOnSelect(element);
        if (variableName === "cidade") 
            filterPointerAddress();
    }
}
document.changeCheckbox = changeCheckbox;

function changeDropdownTitleOnSelect(element) {
    let dropdown = element.closest('.dropdown');
    
    //Verifica quantos itens estão selecionados
    let checkboxes = Array.from(dropdown.querySelectorAll('input[type=checkbox]:checked'));
    let firstCheckbox = dropdown.querySelectorAll('input[type=checkbox]')[0];

    //localiza o botão para poder alterar seu texto
    let button = getDropdownTitle(element);

    if (element.tagName !== 'LI'){
        button.innerText = firstCheckbox.nextSibling.textContent;
        checkboxes.forEach(function(checkbox, index) {
            if (index !== 0)
                checkbox.checked = false;
        });
    }
    else {
        elementAtual = element.querySelector('input[type=checkbox]');
        // Verifica os selecionados e caso for TODOS, deixe apenas ele selecionado
        if (firstCheckbox && firstCheckbox.checked && elementAtual === firstCheckbox) {
            button.innerText = firstCheckbox.nextSibling.textContent;
            checkboxes.forEach(function(checkbox, index) {
                if (index !== 0)
                    checkbox.checked = false;
            });
        } else {
            firstCheckbox.checked = false;
            checkboxes = checkboxes.filter(checkbox => checkbox !== firstCheckbox);
            //monta lista de selecionados
            let itensSelecionados = [];
            checkboxes.forEach(function(checkbox) {
                if (checkbox.checked) 
                    itensSelecionados.push(checkbox.nextSibling.textContent);
            });
            
            // Altera o texto do botão
            if (itensSelecionados && itensSelecionados.length === 0) 
                button.innerText = "Selecione um item";
            else if (itensSelecionados.length > 3) 
                button.innerText = `${itensSelecionados.length} selecionados`;
            else if (!firstCheckbox.checked)
                button.innerText = itensSelecionados.join(', ');
        }
    }

}
// retorna o botão com base no elemento pai do filho selecionado
function getDropdownTitle(element) {
    let dropdown = element.closest('.dropdown');
    let button = dropdown.previousElementSibling;
    return button;
}
//////////Quando houver alteração nos Select dos DropDown/////////////////////

//Quando btn Pesquisar for clicado, emitir evento de alteração nos inputs klipfolio e pesquisar
async function btnSearchClick() {
    if (!formDateValidator())
        return;

    showLoading('idSpinnerSearchPlacas', true);

    loadValuesToSend();
    try {
        //let result = await getPlacas();
        searchPlatesInWebSocket();
        let result = await returnResponsoWebSocket();
        if (result && result.length > 0)
            _resultSearch = result;
        else
            _resultSearch = null;

        updateTable();
    } catch (error) {
        console.error('Erro ao buscar placas', error);
        _resultSearch = null;
        updateTable();
    }
    showLoading('idSpinnerSearchPlacas', false);
}
document.btnSearchClick = btnSearchClick;

function formDateValidator() {
    let dateOK = true;
    const inicio = new Date(document.getElementById('inputInicio').value);
    const fim = new Date(document.getElementById('inputFim').value);

    let popover;
    if (inicio >= fim) {
        popover = new _bootstrap.Popover(document.getElementById('inputInicio'), {
            content: 'A data inicial deve ser menor que a data final.',
            placement: 'bottom',
            trigger: 'focus' // faz ele fechar quando clicar fora
        });
        popover.show();
        dateOK = false;
    }

    let range = (fim - inicio) / (1000 * 60 * 60 * 24);
    if (range > 31) {
        popover = new _bootstrap.Popover(document.getElementById('inputInicio'), {
            content: 'O intervalo entre as datas não pode ser maior que 31 dias.',
            placement: 'bottom',
            trigger: 'focus' // faz ele fechar quando clicar fora
        });
        popover.show();
        dateOK = false;
    }

    document.getElementById('inputInicio').addEventListener('change', function() {
        if (popover) {
            popover.dispose();
            popover = null;
        }
    });
    document.getElementById('inputFim').addEventListener('change', function() {
        if (popover) {
            popover.dispose();
            popover = null;
        }
    });

    return dateOK;
}

//Monta objeto com valores dos filtros para enviar na requisição
function loadValuesToSend() {
    _body = {
        placa: document.getElementById(env.bootstrap.placa).value,
        startDate: document.getElementById(env.bootstrap.dateInit).value,
        endDate: document.getElementById(env.bootstrap.dateEnd).value,
        //cidade: Array.from(document.getElementById(env.bootstrap.menuList.cidade).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.nextSibling.textContent.trim()),
        //ponto: Array.from(document.getElementById(env.bootstrap.menuList.ponto).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.nextSibling.textContent.trim()),
        //endereco: Array.from(document.getElementById(env.bootstrap.menuList.endereco).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.nextSibling.textContent.trim()),
        cidade: Array.from(document.getElementById(env.bootstrap.menuList.cidade).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.value == "_all_" ? checkbox.value : Number(checkbox.value)),
        ponto: Array.from(document.getElementById(env.bootstrap.menuList.ponto).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.nextSibling.textContent.trim().replace(/ /g, '_')),
        endereco: Array.from(document.getElementById(env.bootstrap.menuList.endereco).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.nextSibling.textContent.trim()),
        marca: Array.from(document.getElementById(env.bootstrap.menuList.brand).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.value == "_all_" ? checkbox.value : Number(checkbox.value)),
        modelo: Array.from(document.getElementById(env.bootstrap.menuList.model).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.value == "_all_" ? checkbox.value : Number(checkbox.value)),
        cor: Array.from(document.getElementById(env.bootstrap.menuList.color).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.value == "_all_" ? checkbox.value : Number(checkbox.value)),
        municipio: Array.from(document.getElementById(env.bootstrap.menuList.city).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.value == "_all_" ? checkbox.value : Number(checkbox.value)),
        situacao: Array.from(document.getElementById(env.bootstrap.menuList.situation).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.value == "_all_" ? checkbox.value : Number(checkbox.value)),
        uf: Array.from(document.getElementById(env.bootstrap.menuList.uf).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.value == "_all_" ? checkbox.value : Number(checkbox.value)),
        tipoVeiculo: Array.from(document.getElementById(env.bootstrap.menuList.vehicleType).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.value == "_all_" ? checkbox.value : Number(checkbox.value)),
    }
    if (_body.startDate != null && _body.startDate === ""){
        _body.startDate = _dateTime.newDateForKlipHours(0, 0);
        _body.startDate += ":00";
    }
    else {
        _body.startDate = _dateTime.newDateForKlipText(_body.startDate);
        _body.startDate += ":00";
    }
    
    if (_body.endDate != null && _body.endDate === ""){
        _body.endDate = _dateTime.newDateForKlipHours(23, 59);
        _body.endDate += ":59";
    }
    else {
        _body.endDate = _dateTime.newDateForKlipText(_body.endDate);
        _body.endDate += ":59";
    }
    
    if(_body.cidade.length < 1 || _body.cidade[0] === "Todos")
        _body.cidade = ["_all_"];

    if(_body.ponto.length < 1 || _body.ponto[0] === "Todos")
        _body.ponto = ["_all_"];
    //else
    //    _body.ponto = _body.ponto.join(',').replace(/ /g, '_');
    if(_body.endereco.length < 1 || _body.endereco[0] === "Todos")
        _body.endereco = ["_all_"];
    //else
    //    _body.endereco = _body.endereco.join(',');

    if(_body.marca.length < 1)
        _body.marca = ["_all_"];
    if(_body.modelo.length < 1)
        _body.modelo = ["_all_"];
    if(_body.cor.length < 1)
        _body.cor = ["_all_"];
    if(_body.municipio.length < 1)
        _body.municipio = ["_all_"];
    if(_body.situacao.length < 1) 
        _body.situacao = ["_all_"];
    if(_body.uf.length < 1)
        _body.uf = ["_all_"];
    if(_body.tipoVeiculo.length < 1)
        _body.tipoVeiculo = ["_all_"];

    console.log(_body);
}

// Filtro de selects //  // Filtro de selects //  // Filtro de selects //  // Filtro de selects //
function filterSelectOptions(event) {
    // Obter o valor do campo de pesquisa
    let searchText = event.target.value.toLowerCase();

    // Localizar o dropdown a partir do elemento que disparou o evento
    let dropdown = event.target.parentElement.parentElement;

    // Obter a lista de checkboxes
    let checkboxes = dropdown.getElementsByTagName('input');

    // Iterar sobre cada checkbox
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i + 1];
        if (!checkbox) 
            continue;
        
        let text = "";
        // Obter o texto associado ao checkbox
        if (checkbox.nextSibling != null)
            text = checkbox.nextSibling.textContent.toLowerCase();

        // Mostrar ou ocultar o checkbox com base no texto de pesquisa
        let listItem = checkbox.parentElement.parentElement;
        if (text.includes(searchText)) {
            listItem.style.display = '';
        } else {
            listItem.style.display = 'none';
        }
    }
}
document.filterSelectOptions = filterSelectOptions;
// Filtro de selects //  // Filtro de selects //  // Filtro de selects //  // Filtro de selects //

// Filtra selects de ponto e endereço conforme cidades selecionadas //
function resetCheckboxes(checkboxes) {
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i + 2];
        if (!checkbox) 
            continue;
        checkbox.checked = false;
        let listItem = checkbox.parentElement.parentElement;
        listItem.style.display = '';
    }
}

function filterCheckboxes(checkboxes, itensMostrar) {
    let text = "";
    let checkbox = null;
    let listItem = null;
    let visibleItemsCount = 0;
    if (itensMostrar && itensMostrar.length > 0)
        for (let i = 0; i < checkboxes.length; i++) {
            
            checkbox = checkboxes[i + 2];
            if (!checkbox) 
                continue;
            
            text = "";
            if (checkbox.nextSibling != null)
                text = checkbox.nextSibling.textContent;

            listItem = checkbox.parentElement.parentElement;
            if (itensMostrar.filter(x => x.title.includes(text)).length > 0) {
                listItem.style.display = '';
                visibleItemsCount++;
            } else {
                listItem.style.display = 'none';
            }
        }
}


function filterPointerAddress() {
    let cidades = Array.from(document.getElementById(env.bootstrap.menuList.cidade).querySelectorAll('input[type=checkbox]:checked'), checkbox => checkbox.value);
    let dropdownPonto = document.getElementById(env.bootstrap.menuList.ponto);
    let dropdownEndereco = document.getElementById(env.bootstrap.menuList.endereco);
    
    let checkboxesPonto = dropdownPonto.getElementsByTagName('input');
    let checkboxesEndereco = dropdownEndereco.getElementsByTagName('input');

    resetCheckboxes(checkboxesPonto);
    resetCheckboxes(checkboxesEndereco);

    let itensMostrar = _resultFiltrosCameras.pontos.filter(ponto => cidades.includes(String(ponto.id)));
    filterCheckboxesPoints(checkboxesPonto, itensMostrar);

    itensMostrar = _resultFiltrosCameras.enderecos.filter(end => cidades.includes(String(end.id)));
    filterCheckboxes(checkboxesEndereco, itensMostrar);
    
    changeDropdownTitleOnSelect(dropdownPonto);
    changeDropdownTitleOnSelect(dropdownEndereco);
}
// Filtra selects de ponto e endereço conforme cidades selecionadas //
 function filterCheckboxesPoints(checkboxes, itensMostrar) {
    if (itensMostrar && itensMostrar.length === 0)
        itensMostrar = _resultFiltrosCameras.pontos;
    let uniqueArray = itensMostrar.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t.title === item.title
        ))
    );
    createItensFilterCameras(uniqueArray, "ponto");
 }

 function showDivSituacao() {
    let div = document.getElementById('idDivSituacaoConsultaPlacas');
    if (div){
        div.style.display = div.style.display === 'none' ? '' : 'none';
        if (div.style.display === '') 
            createPopOver('popover988658');
    }
 }
document.showDivSituacao = showDivSituacao;

async function createPopOver(idElement) {
    if (!_bootstrap) 
        await loadBootstrap();
    let popoverElement = document.getElementById(idElement);
    if (popoverElement) {
        let popoverInstance = _bootstrap.Popover.getInstance(popoverElement);
        if (!popoverInstance)
            new _bootstrap.Popover(popoverElement);
    }
}

function showLoading(divId, show) {
    const div = document.getElementById(divId);
    if (div)
        show ? div.style.display = '' : div.style.display = 'none';
}

// tualiza tabela com os dados atualizados  // tualiza tabela com os dados atualizados
function updateTable() {
    let table = document.getElementById(env.bootstrap.table);
    if (!table)
        return;
    let tbody = table.querySelector('tbody');
    if (!tbody)
        return;

    // Limpa a tabela
    tbody.innerHTML = `
        <tr style="position: sticky; top: 35px;">
            <td class="consultaroubo" id="idDivSituacaoConsultaPlacas" style="position: relative; margin-top: 10px; display: none; padding: 0px" colspan="8"> 
            <iframe id="consultaroubo-iframe" class="" allowfullscreen="" frameborder="0" src="https://secweb.procergs.com.br/sav/"
            style="width: 100%; height: 200px; max-height: 320px; border-radius: 5px;"
            ></iframe>
            <svg xmlns="http://www.w3.org/2000/svg" height="23" width="23" viewBox="0 0 512 512"
                style="position: absolute; top: 5px; right: 22px; z-index: 99;" id="popover988658"
                data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="
                    Consulta Roubo/Furto de Veículos SSP/RS - 
                    O presente sistema foi desenvolvido com o objetivo de difundir rapidamente, em todo o Estado do Rio Grande do Sul, as consultas por placa dos veículos envolvidos em ocorrências de FURTO e/ou ROUBO de veículos.
                    Dessa forma, por conta da agilidade na difusão das informações recomenda-se cautela extrema na abordagem policial, tendo em vista a suscetibilidade do sistema a registros indevidos.
                    As informações disponibilizadas são oriundas dos serviços prestados pela SSP através dos fones 190 e registro de furtos de veículos da Polícia Civil, com o objetivo de agilizar e aumentar a recuperação de veículos em situação de furto e/ou roubo.
                " aria-describedby="popover988860"  data-bs-trigger="hover focus"
            ><path fill="#001eff" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
            </td>
        </tr>
    `;

    // Cria uma nova linha para cada placa
    if (_resultSearch && _resultSearch.length > 0)
        for (let i = 0; i < _resultSearch.length; i++) {
            if (_resultSearch[i].Cidade != null)
                _resultSearch[i].Cidade = _resultSearch[i].Cidade.replace(/_/g, ' ');
            if (_resultSearch[i].Ponto != null)
                _resultSearch[i].Ponto = _resultSearch[i].Ponto.replace(/_/g, ' ');

            let tr = document.createElement('tr');
            let td = document.createElement('td');
                let p = document.createElement('span');
                p.innerText = _resultSearch[i].plate;
                p.setAttribute('onclick', `copyTextToClipboard('${_resultSearch[i].plate}', event)`);
                p.style.cursor = 'pointer';
                td.appendChild(p);
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = _dateTime.convertTimesTamp(_resultSearch[i].data_captura);
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = `<img src="https://vision-safeway.s3.sa-east-1.amazonaws.com/${_resultSearch[i].cnpj}/${_resultSearch[i].url}" alt="Placa" style="min-height: 96px; max-width: 125px; border-radius: 6px; cursor: pointer;" onclick="showModal(this)">`;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = `
                <p class="m-0">${_resultSearch[i].idMarca}</p>
                <p class="m-0">${_resultSearch[i].idModelo}</p>
                <p class="m-0">${_resultSearch[i].idCor}</p>
                <p class="m-0">${_resultSearch[i].idTipoVeiculo}</p>
            `;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = `
                <p class="m-0">${_resultSearch[i].idMunicipio}</p>
                <p class="m-0">${_resultSearch[i].idUF}</p>
            `;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = `
                <p class="m-0">${_resultSearch[i].idSituacao}</p>
            `;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = `
                <p class="m-0">${_resultSearch[i].Cidade}</p>
                <p class="m-0">${_resultSearch[i].Ponto}</p>
                <p class="m-0">${_resultSearch[i].Direcao}</p>
            `;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = _resultSearch[i].address;
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    else {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerText = 'Nenhum resultado encontrado, altere os parâmetros da pesquisa.';
        td.colSpan = 8;
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}
// tualiza tabela com os dados atualizados  // tualiza tabela com os dados atualizados

function clearTable() {
    let table = document.getElementById(env.bootstrap.table);
    if (!table)
        return;
    let tbody = table.querySelector('tbody');
    if (!tbody)
        return;

    // Limpa a tabela
    tbody.innerHTML = '';
}

async function copyTextToClipboard(text, event) {
    try {
        await navigator.clipboard.writeText(text);
        let popover = new _bootstrap.Popover(event.target, {
            content: 'Copiado!',
            placement: 'bottom',
        });
        popover.show();
        setTimeout(function() {
            popover.dispose();
        }, 2000);
    } catch (err) {
    }
}
document.copyTextToClipboard = copyTextToClipboard;

// Open Modal //
async function showModal(element) {
    if (!_bootstrap) 
        await loadBootstrap();
    let exampleModal = document.getElementById('filtroPlacaModal');
    if (exampleModal) {
        let modal = new _bootstrap.Modal(exampleModal);
        let modalTitle = exampleModal.querySelector('.modal-header');
        let modalBodyInput = exampleModal.querySelector('.modal-body');

        let tr = element.closest('tr');
        let td = tr.querySelectorAll('td');
        
        // Update the modal's content.
        modalTitle.innerHTML = `
            <p class="m-0">
                ${td[0].innerText ?? ''} - 
                ${td[1].innerText ?? ''} - 
                ${td[3].children[0].innerText ?? ''}/${td[3].children[1].innerText ?? ''}/${td[3].children[2].innerText ?? ''}/${td[3].children[3].innerText ?? ''} - 
                ${td[4].innerText ?? ''} - 
                <span style="font-weight: bold; text-transform: uppercase;">${td[5].innerText ?? ''}</span> - 
                ${td[6].innerText ?? ''}
            </p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
        `;
        modalBodyInput.innerHTML = `<img style="width:100%;" src="${element.src}">`;

       

        // Show the modal
        modal.show();
    }
}
window.showModal = showModal;

let body = {
    "placa": "ile",
    "cidade": "_all_",
    "ponto": "_all_",
    "endereco": "_all_",
    "marca": "_all_",
    "modelo": "_all_",
    "cor": "_all_",
    "municipio": "_all_",
    "situacao": "_all_",
    "uf": "_all_",
    "tipoVeiculo": "_all_",
    "startDate": "_all_",
    "endDate": "_all_",
}

async function init() {
    await loadFilters();
    await createAllDropdowns();
    loadingDefaultValues();
    connectWebSocket();
    showLoading('idSpinnerSearchPlacas', false);
}
//debugger;
init();
