import { useRouter } from 'next/router';
import React from 'react';
import githubApi from '../services/githubApi';
import appConfig from "../../config.json";
import { Icon } from '@skynexui/components';
import Link from 'next/link';
import styles from '../../styles/user.module.css'

export default function User() {
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
      <div className={styles.container}>
         {load ? "" : 
         <>
            <Link href="/" passHref>
               <div className={styles.head} style={{color: appConfig.theme.colors.neutrals[200],}}>
               <Icon
                  label="Icon Component"
                  name="FaArrowLeft"
               />
               <h2>Home</h2>
               </div>
            </Link>
            <ul>
               {repos.map((repo) => {
                  return <li 
                           key={repo.id}
                           style={{backgroundColor: appConfig.theme.colors.neutrals[600],}}>
                              <a href={repo.html_url} target="_blank" rel="noreferrer" style={{color: appConfig.theme.colors.neutrals[300],}}>   {repo.name}
                              </a>
                           </li>
               })}
            </ul>
         </>
         }
      </div>
   )
}