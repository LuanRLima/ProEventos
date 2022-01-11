using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.Domain;
using ProEventos.Persistence;
using Microsoft.AspNetCore.Http;
using ProEventos.Application.Contratos;


namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventoService _eventoService;
        
        public EventosController(IEventoService eventoService)
        {
             _eventoService = eventoService; 
        }
        
        [HttpGet]
        public  async Task<IActionResult> Get()
        {   
            try
            {
                var eventos = await _eventoService.GetAllEventosAsync(true);
                if (eventos == null) return NotFound("Nenhum evento encontrado");
                
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    "Erro ao tentar recuperar os eventos. Erro: " + ex.Message);
            }
            
        }

        [HttpGet("{id}")]
        public  async Task<IActionResult> GetById(int id)
        {
            try
            {
                 var evento = await _eventoService.GetEventosByIdAsync(id, true);
                 if (evento == null) return NotFound("Nenhum evento  por id não encontrado");

                 return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    "Erro ao tentar recuperar os eventos. Erro: " + ex.Message);
            }
        }
        [HttpGet("tema/{tema}")]
        public async Task<IActionResult> GetByTema(string tema)
        {
            try
            {
                var eventos = await _eventoService.GetAllEventosByTemaAsync(tema, true);
                if (eventos == null) return NotFound("Nenhum eventos por tema encontrados");

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    "Erro ao tentar recuperar os eventos. Erro: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
            try
            {
                var evento = await _eventoService.AddEventos(model);
                if (evento == null) return BadRequest("Erro ao tentar adicionar o evento");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    "Erro ao tentar recuperar o evento.  Erro " + ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Evento model)
        {
            try
            {
                var evento = await _eventoService.UpdateEventos(id, model);
                if (evento == null) return BadRequest("Erro ao tentar atualizar o evento");

                return Ok(evento);
            }      
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    "Erro ao tentar recuperar os eventos. Erro: " + ex.Message);
            }      
        
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {   
            try
            {
            var evento = await _eventoService.GetEventosByIdAsync(id, false);
            if (evento == null) return NotFound("Nenhum evento por id não encontrado");

            return await _eventoService.DeleteEventos(id) ? Ok() : BadRequest("Erro ao tentar deletar o evento");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    "Erro ao tentar recuperar os eventos. Erro: " + ex.Message);
            }
        }
    }
}