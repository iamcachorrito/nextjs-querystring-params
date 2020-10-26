import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function useQueryParams({ query }) {
    
    const queryParams = useRouter().query;

    // Inicializar state de los parametros de consulta
    const [values, setValues] = useState(query);
    
    useEffect(() => {
        if (queryParams) {
            let params = {};
            // Obtener valueres de la url
            const { categorias, marcas } = queryParams;

            if (categorias) {
                params.categorias = categorias;
            }
            if (marcas) {
                params.marcas = marcas;
            }

            // Validar que params no está vacío
            if (params) {
                // Actualizamos values state
                setValues({
                    ...values,
                    ...params
                });
            }
        }
    }, []);

    return [values, setValues];
}

export { useQueryParams };