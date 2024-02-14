import { PageProps } from "$fresh/server.ts"
import { person } from "./types.tsx"

const miPagina = (props: PageProps<person>) => {
    return (
        <div>
            <form method="get" action="/people">
                <input type="text" name="name" />
                <button type= "submit"> Buscar </button>
            </form>
        </div>
    )
}

export default miPagina