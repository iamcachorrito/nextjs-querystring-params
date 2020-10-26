import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { identity, pickBy } from 'lodash';
import { useQueryParams } from '../common/customHooks'
import Checkbox from '../components/checkbox'
import styles from '../styles/Home.module.css'

function Home({ query }) {

  const router = useRouter();
  const [queryParams, setQueryParams] = useQueryParams({ query });

  useEffect(() => {
    const cleanedObject = pickBy(queryParams, identity);
    router.push({
      query: cleanedObject
    });
  }, [queryParams])

  const updateQueryParams = (e) => {
    console.log('hello from updateQueryParams')
    let filterValue;
    if (e.target.checked) {
      if (queryParams[e.target.name]) {
        filterValue = queryParams[e.target.name];
        const foundParamValue = filterValue.includes(e.target.value);
        if (!foundParamValue) {
          filterValue = filterValue.concat(`;${e.target.value}`);
        }
      } else {
        filterValue = `${e.target.value}`;
      }
      setQueryParams({
        ...queryParams,
        [e.target.name]: filterValue
      });
    } else {
      if (queryParams[e.target.name].includes(`;${e.target.value}`)) {
        filterValue = queryParams[e.target.name].replace(`;${e.target.value}`, '');
      } else if (queryParams[e.target.name].includes(`${e.target.value};`)) {
        filterValue = queryParams[e.target.name].replace(`${e.target.value};`, '');
      } else {
        filterValue = '';
      }
      setQueryParams({
        ...queryParams,
        [e.target.name]: filterValue
      });
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Checkbox
          elemId='checkbox1'
          elemName='categorias'
          elemValue='ropa'
          params={queryParams}
          updateQueryParams={updateQueryParams}
        >
          Ropa
        </Checkbox>
        <Checkbox
          elemId='checkbox2'
          elemName='categorias'
          elemValue='zapatos'
          params={queryParams}
          updateQueryParams={updateQueryParams}
        >
          Zapatos
        </Checkbox>
        <Checkbox
          elemId='checkbox3'
          elemName='categorias'
          elemValue='sombreros'
          params={queryParams}
          updateQueryParams={updateQueryParams}
        >
          Sombreros
        </Checkbox>
        <Checkbox
          elemId='checkbox4'
          elemName='marcas'
          elemValue='google'
          params={queryParams}
          updateQueryParams={updateQueryParams}
        >
          Google
        </Checkbox>
        <Checkbox
          elemId='checkbox5'
          elemName='marcas'
          elemValue='facebook'
          params={queryParams}
          updateQueryParams={updateQueryParams}
        >
          Facebook
        </Checkbox>
      </main>
    </div>
  )
}

Home.getInitialProps = ({ query }) => {
  return {
    query
  };
}

export default Home;
