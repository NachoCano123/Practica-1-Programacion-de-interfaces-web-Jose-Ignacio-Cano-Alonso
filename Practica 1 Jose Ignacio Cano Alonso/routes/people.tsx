import { FreshContext, Handlers, PageProps } from "$fresh/server.ts"
import axios from "npm:axios";
import { person } from "./types.tsx"

export const handler: Handlers = {
    GET: async (req:Request, ctx:FreshContext<unknown, person>) => { 
        try {
            const url = new URL (req.url)
            const name = url.searchParams.get("name") || undefined
            const people = await axios.get (`https://swapi.dev/api/people?search=${name}`)
        
            if(people.status !== 200)
            {
                throw new Error("Ha habido un error")
            }

            return ctx.render({
                name: people.data.results[0]?.name,
                height: people.data.results[0]?.height,
                mass: people.data.results[0]?.mass,
                gender: people.data.results[0]?.gender,
                birth_year: people.data.results[0]?.birth_year
            })
        }
        catch (e)
        {
            throw new Error("Ha habido un error")
        }
    } 
}

const miPagina = (props: PageProps<person>) => {
    return (
        <div>
            <h1> {props.data.name} </h1>
            <ul>
                <li> Altura: {props.data.height} </li>
                <li> Masa: {props.data.mass} </li>
                <li> Genero: {props.data.gender} </li>
                <li> Año de nacimiento: {props.data.birth_year} </li>
            </ul>
        </div>
    )
}

export default miPagina