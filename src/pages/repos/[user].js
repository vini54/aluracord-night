import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import githubApi from '../../services/githubApi';
import appConfig from "../../../config.json";
import { Icon } from '@skynexui/components';
import Link from 'next/link';

export default function Repos() {
   const router = useRouter()
   const {user} = router.query
   console.log(user)
   
   const [repos, setRepos] = React.useState([])
   const [load, setLoad] = React.useState(true)
   
   React.useEffect(() => {
      if(!router.isReady) return;
      githubApi.get(`/${user}/repos`)
      .then(({data}) => {
         setRepos(data)
         console.log(data)
         setLoad(false)
      })
      .catch((error) => {
         console.log(error)
      })
   }, [router.isReady])

   return (
      <Container>
         {load ? "" : 
         <>
            <Link href="/">
               <div className="head">
               <Icon
                  label="Icon Component"
                  name="FaArrowLeft"
               />
               <h2>Home</h2>
               </div>
            </Link>
            <ul>
               {repos.map((repo) => {
                  return <li key={repo.id}><a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a></li>
               })}
            </ul>
         </>
         }
      </Container>
   )
}


export const Container = styled.div`
max-height: 70vh;
overflow-y: scroll;
::-webkit-scrollbar{
   display: none;
}
.head{
   margin: 10px 0 20px;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   gap: 10px;
   cursor: pointer;
   color: ${appConfig.theme.colors.neutrals[200]};
}
   ul{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      li{
         display: flex;
         justify-content: center;
         align-items: center;
         padding: 10px;
         background-color: ${appConfig.theme.colors.neutrals[600]};
         border-radius: 5px;
         width: 30%;
         font-size: 20px;
         word-wrap: break-word;
         a{
            text-align: center;
            text-decoration: none;
            color: ${appConfig.theme.colors.neutrals[300]};
         }
      }
   }
`;