import { FreshContext, Handlers, PageProps } from "$fresh/server.ts"
import axios from "npm:axios"
import { Starship } from "./types.tsx"

type Pageinfo = {
    pagenum: string
    data: datapag
}

type datapag = {
    page: Pageinfo
    results: Starship[]
}

export const handler: Handlers = {
    GET: async (req:Request, ctx:FreshContext<unknown, Pageinfo>) => {
        try {
            debugger
            const url = new URL (req.url) //Capturamos la url que nos está llegando
            const Page = url.searchParams.get("pagenum") || "" 
            const response = await axios.get<datapag>(`https://swapi.dev/api/starships?page=${Page}`)
            if(response.status !== 200)
            {
                throw new Error ("Ha habido un error")    
            }
            //Hasta aquí todo bien porque segun el debugger response tiene los datos de la página que le pongo. 
            //El problema estará en el render, porque el pagenum está como undefined y no llega a la función mipagina
            return ctx.render({
                pagenum: Page,
                data: response.data
            })
            
        } catch (e) {
            throw new Error ("Ha habido un error")
        }
    }
}

const mipagina = (props: PageProps<Pageinfo>) => {
    
    const intpagenum = parseInt(props.data.pagenum)
    if (intpagenum == 1)
    {
        return(
            <div>
                    <h1> Pagina {props.data.pagenum} </h1>
                    <a href = {`/page?pagenum=${intpagenum + 1}`}> Pagina siguiente <br></br> </a>
                    
                    <p> Buscar pagina de la 1 a la 4 </p>
                    <form method="get" action="/page">
                    <input type="text" name="pagenum" /> 
                    <button type= "submit"> Buscar página </button>
                    </form>
    
                    <ul> 
                        {props.data.data.results.map(ch => { 
                            return (
                                <ul>
                                    <h1> {ch.name} </h1> 
                                    <li> Modelo: {ch.model} </li>
                                    <li> Fabricante: {ch.manufacturer} </li>
                                    <li> Coste en créditos: {ch.cost_in_credits} </li> 
                                </ul>
                            )
                        })}
                    </ul>
                    
                </div>
            )
    }

    if (intpagenum == 4)
    {
        return(
            <div>
                    <h1> Pagina {props.data.pagenum} </h1>
                    <a href = {`/page?pagenum=${intpagenum - 1}`}> Pagina anterior <br></br> </a>
                    
                    <p> Buscar pagina de la 1 a la 4 </p>
                    <form method="get" action="/page">
                    <input type="text" name="pagenum" /> 
                    <button type= "submit"> Buscar página </button>
                    </form>
    
                    <ul> 
                        {props.data.data.results.map(ch => { 
                            return (
                                <ul>
                                    <h1> {ch.name} </h1> 
                                    <li> Modelo: {ch.model} </li>
                                    <li> Fabricante: {ch.manufacturer} </li>
                                    <li> Coste en créditos: {ch.cost_in_credits} </li> 
                                </ul>
                            )
                        })}
                    </ul>
                    
                </div>
            )
    }

    return(
        <div>
                <h1> Pagina {props.data.pagenum} </h1>
                <a href = {`/page?pagenum=${intpagenum + 1}`}> Pagina siguiente | </a>
                <a href = {`/page?pagenum=${intpagenum - 1}`}> Pagina anterior <br></br> </a>
                
                <p> Buscar pagina de la 1 a la 4 </p>
                <form method="get" action="/page">
                <input type="text" name="pagenum" /> 
                <button type= "submit"> Buscar página </button>
                </form>

                <ul> 
                    {props.data.data.results.map(ch => { 
                        return (
                            <ul>
                                <h1> {ch.name} </h1> 
                                <li> Modelo: {ch.model} </li>
                                <li> Fabricante: {ch.manufacturer} </li>
                                <li> Coste en créditos: {ch.cost_in_credits} </li> 
                            </ul>
                        )
                    })}
                </ul>
                
            </div>
        )
}

export default mipagina