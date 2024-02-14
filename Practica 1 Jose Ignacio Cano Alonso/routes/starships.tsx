//Hay que usar el query params para elegir la página a la que quieres ir
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts"
import axios from "npm:axios"
import { Starship } from "./types.tsx"

export const handler: Handlers = {
    GET: async (req:Request, ctx:FreshContext<unknown, Starship>) => { 
        try {
            const url = new URL (req.url)
            const name = url.searchParams.get("name") || undefined
            const nave = await axios.get (`https://swapi.dev/api/starships?search=${name}`)

            if(nave.status !== 200)
            {
                throw new Error("Ha habido un error")
            }

            return ctx.render({
                name: nave.data.results[0]?.name,
                model: nave.data.results[0]?.model,
                manufacturer: nave.data.results[0]?.manufacturer,
                cost_in_credits: nave.data.results[0]?.cost_in_credits
            })
        }
        catch (e)
        {
            throw new Error("Ha habido un error")
        }  
    } 
}

const miPagina = (props: PageProps<Starship>) => {
    return (
        <div>
            <h1> {props.data.name} </h1>
            <ul>
                <li> modelo: {props.data.model} </li>
                <li> Fabricante: {props.data.manufacturer} </li>
                <li> Coste en créditos: {props.data.cost_in_credits} </li>
            </ul>
            <br></br>
            {/* Aqui mete una referencia al archivo Page para poder obtener los links a las paginas siguiente, anterior y al buscador */}
            {/*<a href={"/Page"}> Páginas </a>*/}
            <h2> ¿Quieres acceder a alguna página? (De la 1 a la 4) </h2>
            <form method="get" action="/page">
                <input type="text" name="pagenum" />
                <button type= "submit"> buscar </button>
            </form>
        </div>
    )
}

export default miPagina