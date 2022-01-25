import React from "react";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../../config.json";
import styled from 'styled-components';
import githubApi from "../services/githubApi"
import Link from "next/link";


export default function Home() {
	const [username, setUsername] = React.useState("vini54");
	const [avatar, setAvatar] = React.useState("/defaultAvatar.png");

	React.useEffect(() => {
		setAvatar("/defaultAvatar.png")
		if(username.length > 2){
			githubApi.get(`/${username}`)
			.then(({data}) => {
				setAvatar(data.avatar_url)
			})
			.catch((error) => {
				console.log(error)
				setAvatar("/defaultAvatar.png")
			})
		}
	}, [username])

	return (
		<Container>
			{/* Formulário */}
			<Box
				as="form"
				className="form"
				styleSheet={{
					width: { xs: "100%", sm: "50%" },
				}}>
				
				<Titulo tag="h2">Boas vindas de volta!</Titulo>

				<Text
					variant="body3"
					className="box--titleSpan"
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
			<Box className="photo" >
				<Image
					className="photo--image"
					src={avatar}
					alt="avatar"
				/>
				<div className="photo--altDiv">
					<Text
						variant="body4"
						className="photo--alt"
					>
						{username}
					</Text>
					<Link href={"/repos/" + username}>
						<Text
							tag="a"
							variant="body4"
							className="photo--alt"
						>
							🔗Repositórios
						</Text>
					</Link>
				</div>
			</Box>
			{/* Photo Area */}
		</Container>
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

export const Container = styled.div`

display: flex;
align-items: center;
justify-content: space-between;
gap: 10px;
width: 100%;

@media screen and (max-width: 480px){
   flex-direction: column;
}

.box--titleSpan{
	margin-bottom: 32px;
	color: ${appConfig.theme.colors.neutrals[300]};
}

.photo{
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 200px;
	padding: 16px;
	background-color: ${appConfig.theme.colors.neutrals[800]};
	border: 1px solid;
	border-color: ${appConfig.theme.colors.neutrals[999]};
	border-radius: 10px;
	flex: 1;
	min-height: 240px;
}

.photo--image{
	border-radius: 50%;
	margin-bottom: 16px;
}
.photo--altDiv{
	display: flex;
	gap: 10px;
}
.photo--alt{
	color: ${appConfig.theme.colors.neutrals[200]};
	background-color: ${appConfig.theme.colors.neutrals[900]};
	padding: 3px 10px;
	border-radius: 1000px;
}
.photo--alt:nth-child(2){
	cursor: pointer;
}

.form{
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   text-align: center;
   margin-bottom: 32px;
}
`;