var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const async = require('hbs/lib/async');

var router = express.Router();

var novedadesModel = require('./../../models/novedadesModel');

router.get('/', async function(req, res, next) {
    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades',{layout:'admin/layout',usuario: req.session.nombre,
    novedades});
    
  });
router.get('/agregar',(req,res,next)=>{
  res.render('admin/agregar',{
    layout: 'admin/layout'
  })
});


// prueba de error insert novedad
router.post('/agregar', async(req,res,next)=>{
  try{
    if(req.body.titulo !="" && req.body.subtitulo !="" && req.body.cuerpo != ""){
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    }
    else{
      res.render('admin/agregar',{
        layout:'admin/layout',
        error: true,message:'Todos los campos son requeridos'
      })
    }
  }
  catch(error){
    console.log(error);
    res.render('admin/agregar',{
      layout:'admin/layout',
      error:true, message:'No se cargo la novedad'
    });
  }
});

// fin prueba de error 

// para eliminar

router.get('/eliminar/:id', async(req,res,next)=>{
  var id = req.params.id;
  await novedadesModel.deleteNovedades(id);
  res.redirect('/admin/novedades');

});

// fin eliminar

// para modificar traigo la novedad por id

router.get('/modificar/:id', async(req,res,next)=>{
  var id = req.params.id;
  console.log(req.params.id);
  var novedad = await novedadesModel.getNovedadById(id);
  
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  });



});
// fin de traer la novedad

// modificar una novedad- UPDATE

router.post('/modificar', async(req,res,next)=>{

  try{
    var obj= {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }
    console.log(obj)

    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
  
  }
  catch(error){
    console.log(error);
    res.render('admin/modificar',{
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico la novedad'
    });


  }

});

// fin update



module.exports = router;