/**************************************************************************************
*  Objetivo: Responsável por gerenciar funções de dados do anuncio
*  Autor: Luiz Gustavo 
*  Data: 15/09/2023
*  Versão: 1.0
**************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAllAnuncio = async () => {

    let sql = `select 
    anuncio.id, 
    anuncio.nome, 
    anuncio.ano_lancamento,
    date_format(anuncio.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    anuncio.status_anuncio,
    anuncio.edicao,
    anuncio.preco,
    anuncio.descricao,
    anuncio.status_anuncio,
    anuncio.numero_paginas,
    anuncio.id_usuario,
    endereco.estado,
    endereco.cidade,
    endereco.bairro,
    anuncio.id_estado_livro,
    estado_livro.estado as estado_livro,
    anuncio.id_idioma,
    anuncio.id_usuario as id_anunciante,
    idioma.nome as nome_idioma,
    anuncio.id_editora,
    editora.nome as nome_editora
    from tbl_anuncio as anuncio
    	inner join tbl_usuario as usuario
	    	on usuario.id = anuncio.id_usuario
	    inner join tbl_endereco as endereco 
    		on endereco.id = usuario.id_endereco
	    inner join tbl_estado_livro as estado_livro
		    on estado_livro.id = anuncio.id_estado_livro
	    inner join tbl_idioma as idioma
    		on anuncio.id_idioma = idioma.id
	    inner join tbl_editora as editora
		    on editora.id = anuncio.id_editora
    where anuncio.status_anuncio = true
    order by id asc`

    let rsAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncio.length > 0) {
        return rsAnuncio
    } else {
        return false
    }
}

const mdlSelectAnuncioPage = async (page) => {
    page = Number(page) - 1

    let sql = `select 
    anuncio.id, 
    anuncio.nome, 
    anuncio.ano_lancamento,
    date_format(anuncio.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    anuncio.status_anuncio,
    anuncio.edicao,
    anuncio.preco,
    anuncio.descricao,
    anuncio.status_anuncio,
    anuncio.numero_paginas,
    anuncio.id_usuario,
    endereco.estado,
    endereco.cidade,
    endereco.bairro,
    anuncio.id_estado_livro,
    estado_livro.estado as estado_livro,
    anuncio.id_idioma,
    anuncio.id_usuario as id_anunciante,
    idioma.nome as nome_idioma,
    anuncio.id_editora,
    editora.nome as nome_editora
    from tbl_anuncio as anuncio
    	inner join tbl_usuario as usuario
	    	on usuario.id = anuncio.id_usuario
	    inner join tbl_endereco as endereco 
    		on endereco.id = usuario.id_endereco
	    inner join tbl_estado_livro as estado_livro
		    on estado_livro.id = anuncio.id_estado_livro
	    inner join tbl_idioma as idioma
    		on anuncio.id_idioma = idioma.id
	    inner join tbl_editora as editora
		    on editora.id = anuncio.id_editora
        where anuncio.status_anuncio = true
        order by id asc limit 10 offset ${page}0`

    let rsAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncio.length > 0) {
        return rsAnuncio
    } else {
        return false
    }
}

const mdlSelectAnuncioById = async (id) => {
    let sql = `select 
    anuncio.id, 
    anuncio.nome, 
    anuncio.ano_lancamento,
    date_format(anuncio.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    anuncio.status_anuncio,
    anuncio.edicao,
    anuncio.preco,
    anuncio.descricao,
    anuncio.status_anuncio,
    anuncio.numero_paginas,
    endereco.estado,
    endereco.cidade,
    endereco.bairro,
    anuncio.id_estado_livro,
    estado_livro.estado as estado_livro,
    anuncio.id_idioma,
    anuncio.id_usuario as id_anunciante,
    idioma.nome as nome_idioma,
    anuncio.id_editora,
    editora.nome as nome_editora,
    foto.foto
    from tbl_anuncio as anuncio
        inner join tbl_foto as foto
            on foto.id_anuncio = anuncio.id
    	inner join tbl_usuario as usuario
	    	on usuario.id = anuncio.id_usuario
	    inner join tbl_endereco as endereco 
    		on endereco.id = usuario.id_endereco
	    inner join tbl_estado_livro as estado_livro
		    on estado_livro.id = anuncio.id_estado_livro
	    inner join tbl_idioma as idioma
    		on anuncio.id_idioma = idioma.id
	    inner join tbl_editora as editora
		    on editora.id = anuncio.id_editora
    where anuncio.id = ${id}`

    let rsAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncio.length > 0) {
        return rsAnuncio
    } else {
        return false
    }
}

const mdlSelectAnuncioByIdUsuario = async (idUsuario) => {
    let sql = `select 
    anuncio.id, 
    anuncio.nome, 
    anuncio.ano_lancamento,
    date_format(anuncio.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    anuncio.status_anuncio,
    anuncio.edicao,
    anuncio.preco,
    anuncio.descricao,
    anuncio.status_anuncio,
    anuncio.numero_paginas,
    anuncio.id_estado_livro,
    endereco.estado,
    endereco.cidade,
    endereco.bairro,
    estado_livro.estado as estado_livro,
    anuncio.id_idioma,
    idioma.nome as nome_idioma,
    anuncio.id_editora,
    anuncio.id_usuario as id_anunciante,
    editora.nome as nome_editora,
    foto.foto
    from tbl_anuncio as anuncio
        inner join tbl_foto as foto
            on foto.id_anuncio = anuncio.id
    	inner join tbl_usuario as usuario
	    	on usuario.id = anuncio.id_usuario
	    inner join tbl_endereco as endereco 
    		on endereco.id = usuario.id_endereco
	    inner join tbl_estado_livro as estado_livro
		    on estado_livro.id = anuncio.id_estado_livro
	    inner join tbl_idioma as idioma
    		on anuncio.id_idioma = idioma.id
	    inner join tbl_editora as editora
		    on editora.id = anuncio.id_editora
    where anuncio.id_usuario = ${idUsuario}`

    let rsAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncio.length > 0) {
        return rsAnuncio
    } else if (rsAnuncio == 0) {
        return null
    } else {
        return false
    }
}

const mdlSelectAnuncioByLocalização = async (bairro, cidade, estado, page) => {
    page = Number(page) - 1

    let sql = `select 
    anuncio.id, 
    anuncio.nome, 
    anuncio.ano_lancamento,
    date_format(anuncio.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    anuncio.status_anuncio,
    anuncio.edicao,
    anuncio.preco,
    anuncio.descricao,
    anuncio.status_anuncio,
    anuncio.numero_paginas,
    anuncio.id_estado_livro,
    estado_livro.estado as estado_livro,
    anuncio.id_idioma,
    endereco.estado,
    endereco.cidade,
    endereco.bairro,
    anuncio.id_usuario as id_anunciante,
    idioma.nome as nome_idioma,
    anuncio.id_editora,
    editora.nome as nome_editora,
    foto.foto
    from tbl_anuncio as anuncio
        inner join tbl_foto as foto
            on foto.id_anuncio = anuncio.id
    	inner join tbl_usuario as usuario
	    	on usuario.id = anuncio.id_usuario
	    inner join tbl_endereco as endereco 
    		on endereco.id = usuario.id_endereco
	    inner join tbl_estado_livro as estado_livro
		    on estado_livro.id = anuncio.id_estado_livro
	    inner join tbl_idioma as idioma
    		on anuncio.id_idioma = idioma.id
	    inner join tbl_editora as editora
		    on editora.id = anuncio.id_editora
    order by field(endereco.bairro, '${bairro}') desc, 
	    case when endereco.bairro = '${bairro}' THEN 1 ELSE 2 END,
	    case when endereco.cidade = '${cidade}' THEN 1 ELSE 2 END,
        case when endereco.estado = '${estado}' THEN 1 ELSE 2 END,
    bairro asc, 
    cidade asc,
    estado asc,
    id asc limit 10 offset ${page}0`
    
    let rsAnuncio = await prisma.$queryRawUnsafe(sql)

    if(rsAnuncio.length > 0){
        return rsAnuncio
    }else{
        return false
    }
}

const mdlSelectAnuncioLastId = async () => {
    let sql = `select 
    anuncio.id, 
    anuncio.nome, 
    anuncio.ano_lancamento,
    date_format(anuncio.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    anuncio.status_anuncio,
    anuncio.edicao,
    anuncio.preco,
    anuncio.descricao,
    anuncio.status_anuncio,
    anuncio.numero_paginas,
    endereco.estado,
    endereco.cidade,
    endereco.bairro,
    anuncio.id_estado_livro,
    estado_livro.estado as estado_livro,
    anuncio.id_idioma,
    anuncio.id_usuario as id_anunciante,
    idioma.nome as nome_idioma,
    anuncio.id_editora,
    editora.nome as nome_editora,
    foto.foto
    from tbl_anuncio as anuncio
        inner join tbl_foto as foto
            on foto.id_anuncio = anuncio.id
    	inner join tbl_usuario as usuario
	    	on usuario.id = anuncio.id_usuario
	    inner join tbl_endereco as endereco 
    		on endereco.id = usuario.id_endereco
	    inner join tbl_estado_livro as estado_livro
		    on estado_livro.id = anuncio.id_estado_livro
	    inner join tbl_idioma as idioma
    		on anuncio.id_idioma = idioma.id
	    inner join tbl_editora as editora
		    on editora.id = anuncio.id_editora
    order by anuncio.id desc limit 1`

    let rsAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncio.length > 0) {
        return rsAnuncio
    } else {
        return false
    }
}

const mdlInsertAnuncio = async (dadosAnuncio) => {
    let sql = `insert into tbl_anuncio(
        nome,
        numero_paginas,
        ano_lancamento,
        descricao,
        data_criacao,
        edicao,
        isbn,
        preco,
        id_usuario,
        id_estado_livro,
        id_idioma,
        id_editora
        ) values (
        "${dadosAnuncio.nome}",
        ${dadosAnuncio.numero_paginas},
        ${dadosAnuncio.ano_lancamento},
        "${dadosAnuncio.descricao}",
        current_timestamp(),
        "${dadosAnuncio.edicao}",
        ${dadosAnuncio.isbn},
        ${dadosAnuncio.preco},
        ${dadosAnuncio.id_usuario},
        ${dadosAnuncio.id_estado_livro},
        ${dadosAnuncio.id_idioma},
        ${dadosAnuncio.id_editora}
       );
       
    `

    let resultAnuncio = await prisma.$executeRawUnsafe(sql)

    if (resultAnuncio) {
        return true
    } else {
        return false
    }

}

const mdlSelectAnuncioFromLastId = async () => {
    let sql = `select * from tbl_anuncio order by tbl_anuncio.id desc limit 1`

    let rsAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncio.length > 0) {
        return rsAnuncio
    } else {
        return false
    }
}

const mdlSelectsFiltros = async(arrayGenero, arrayEstado_livro)=>{
    

    let sql = `
    select 
        anuncio.id, 
        anuncio.nome, 
        anuncio.ano_lancamento,
        date_format(anuncio.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
        anuncio.status_anuncio,
        anuncio.edicao,
        anuncio.preco,
        anuncio.descricao,
        anuncio.status_anuncio,
        anuncio.numero_paginas,
        anuncio.id_usuario,
        endereco.estado,
        endereco.cidade,
        endereco.bairro,
        anuncio.id_estado_livro,
        estado_livro.estado as estado_livro,
        anuncio.id_idioma,
        anuncio.id_usuario as id_anunciante,
        idioma.nome as nome_idioma,
        anuncio.id_editora,
        editora.nome as nome_editora,
        tbl_genero.nome as genero
        from tbl_anuncio as anuncio
            inner join tbl_usuario as usuario
                on usuario.id = anuncio.id_usuario
            inner join tbl_endereco as endereco 
                on endereco.id = usuario.id_endereco
            inner join tbl_estado_livro as estado_livro
                on estado_livro.id = anuncio.id_estado_livro
            inner join tbl_idioma as idioma
                on anuncio.id_idioma = idioma.id
            inner join tbl_editora as editora
                on editora.id = anuncio.id_editora
            inner join tbl_anuncio_genero
                on tbl_anuncio_genero.id_anuncio = anuncio.id
            inner join tbl_genero
                on tbl_anuncio_genero.id_genero = tbl_genero.id
                order by id asc;`

    let rsAnuncio = await prisma.$queryRawUnsafe(sql)

    let array = []

    if(
        arrayGenero == null || arrayGenero == "" || arrayGenero == undefined 
    ){
        
        rsAnuncio = rsAnuncio.filter(rsAnuncio => rsAnuncio.estado_livro == arrayEstado_livro[0] || arrayEstado_livro[1])
        

    } else if(
        arrayEstado_livro == null || arrayEstado_livro == "" || arrayEstado_livro == undefined
    ){
        
        rsAnuncio = rsAnuncio.filter(rsAnuncio => rsAnuncio.genero == `${arrayGenero}`)

        array.push(arrayGenero)

        rsAnuncio = array
    }


    console.log("TESTEEEE" + rsAnuncio);

    if (rsAnuncio) {
        return rsAnuncio
    } else {
        return false
    }
}

const mdlSelectsAlAnunciosThenFilter = async()=>{
    

    let sql = `select 
    anuncio.id, 
    anuncio.nome, 
    anuncio.ano_lancamento,
    date_format(anuncio.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    anuncio.status_anuncio,
    anuncio.edicao,
    anuncio.preco,
    anuncio.descricao,
    anuncio.status_anuncio,
    anuncio.numero_paginas,
    anuncio.id_usuario,
    endereco.estado,
    endereco.cidade,
    endereco.bairro,
    anuncio.id_estado_livro,
    estado_livro.estado as estado_livro,
    anuncio.id_idioma,
    anuncio.id_usuario as id_anunciante,
    idioma.nome as nome_idioma,
    anuncio.id_editora,
    editora.nome as nome_editora
    from tbl_anuncio as anuncio
    	inner join tbl_usuario as usuario
	    	on usuario.id = anuncio.id_usuario
	    inner join tbl_endereco as endereco 
    		on endereco.id = usuario.id_endereco
	    inner join tbl_estado_livro as estado_livro
		    on estado_livro.id = anuncio.id_estado_livro
	    inner join tbl_idioma as idioma
    		on anuncio.id_idioma = idioma.id
	    inner join tbl_editora as editora
		    on editora.id = anuncio.id_editora
            where anuncio.status_anuncio = true
                order by id asc`

    let rsAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncio.length > 0) {
            return rsAnuncio
    } else {
             return false
    }     
}






module.exports = {
    mdlSelectAllAnuncio,
    mdlSelectAnuncioById,
    mdlSelectAnuncioByIdUsuario,
    mdlSelectAnuncioByLocalização,
    mdlInsertAnuncio,
    mdlSelectAnuncioLastId,
    mdlSelectAnuncioFromLastId,
    mdlSelectAnuncioPage,
    mdlSelectsAlAnunciosThenFilter
}