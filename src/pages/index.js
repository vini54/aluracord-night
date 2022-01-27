import React from "react";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../../config.json";
import githubApi from "../services/githubApi"
import Link from "next/link";
import styles from "../../styles/home.module.css"
import { useRouter } from "next/router";


export default function Home() {
	const [username, setUsername] = React.useState("vini54");
	const [avatar, setAvatar] = React.useState("/defaultAvatar.png");
	const router = useRouter()

	React.useEffect(() => {
		setAvatar("/defaultAvatar.png")
		if(username.length > 2){
			githubApi.get(`/${username}`)
			.then(({data}) => {
				setAvatar(data.avatar_url)
			})
			.catch((error) => {
				// console.log(error)
				setAvatar("/defaultAvatar.png")
			})
		}
	}, [username])

	const handleEnter = (e) => {
		e.preventDefault()
		router.push(`/chat/${username}`)
	}

	return (
		<div className={styles.Container}>
			{/* Formulário */}
			<Box
				as="form"
				className={styles.form}
				styleSheet={{
					width: { xs: "100%", sm: "50%" },
				}}>
				
				<Titulo tag="h2">Boas vindas de volta!</Titulo>

				<Text
					variant="body3"
					className={styles.boxTitleSpan}
					styleSheet={{color: appConfig.theme.colors.neutrals[300],}}
				>
					{appConfig.name}
				</Text>

				<TextField
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					fullWidth
					textFieldColors={{
						neutral: {
							textColor: appConfig.theme.colors.neutrals[200],
							mainColor: appConfig.theme.colors.neutrals[900],
							mainColorHighlight: appConfig.theme.colors.primary[500],
							backgroundColor: appConfig.theme.colors.neutrals[800],
						},
					}}
				/>
				<Button
					type="submit"
					onClick={(e) => {handleEnter(e)}}
					label="Entrar"
					fullWidth
					buttonColors={{
						contrastColor: appConfig.theme.colors.neutrals["000"],
						mainColor: appConfig.theme.colors.primary[500],
						mainColorLight: appConfig.theme.colors.primary[400],
						mainColorStrong: appConfig.theme.colors.primary[600],
					}}
				/>
			</Box>
			{/* Formulário */}

			{/* Photo Area */}
			<Box className={styles.photo} styleSheet={{backgroundColor: appConfig.theme.colors.neutrals[800], borderColor: appConfig.theme.colors.neutrals[999],}} >
				<Image
					className={styles.photoImage}
					src={avatar}
					alt="avatar"
				/>
				<div className={styles.photoAltDiv}>
					<Text
						variant="body4"
						className={styles.photoAlt}
						styleSheet={{color: appConfig.theme.colors.neutrals[200], backgroundColor: appConfig.theme.colors.neutrals[900],}}
					>
						{username}
					</Text>
					<Link href={"/" + username}>
						<a 
							className={styles.photoAlt} 
							style={{color: appConfig.theme.colors.neutrals[200], backgroundColor: appConfig.theme.colors.neutrals[900],}}
						>
							🔗Repositórios
						</a>
					</Link>
				</div>
			</Box>
			{/* Photo Area */}
		</div>
	);
}

function Titulo(props) {
	const Tag = props.tag || "h1";
	return (
		<>
			<Tag>{props.children}</Tag>
			<style jsx>{`
				${Tag} {
					color: ${appConfig.theme.colors.neutrals["000"]};
					font-size: 24px;
					font-weight: 600;
				}
			`}</style>
		</>
	);
}