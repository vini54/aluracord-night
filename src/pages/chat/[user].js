import React from "react";
import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import appConfig from "../../../config.json";
import styles from "../../../styles/chat.module.css";
import { useRouter } from "next/router";
import githubApi from '../../services/githubApi';

export default function Chat() {
	const [mensagem, setMensagem] = React.useState("");
	const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
	const [avatarUrl, setAvatarUrl] = React.useState('')
	const router = useRouter()

	const {user} = router.query

	React.useEffect(() => {
      if(!router.isReady) return;
      githubApi.get(`/${user}`)
      .then(({data}) => {
			setAvatarUrl(data.avatar_url)
      })
      .catch((error) => {
         console.log(error)
      })
   }, [router.isReady])

	function handleNovaMensagem(novaMensagem) {
		const mensagem = {
			id: listaDeMensagens.length + 1,
			de: user,
			texto: novaMensagem,
		};

		setListaDeMensagens([mensagem, ...listaDeMensagens]);
		setMensagem("");
	}

   const removeItem = (id) => {
      setListaDeMensagens((existingItens) => {
         return existingItens.filter((item) => item.id !== id)
      })
   }

	return (
		<Box className={styles.container}>
			<Header />
			<Box
         className={styles.main}
				styleSheet={{
					backgroundColor: appConfig.theme.colors.neutrals[600],
				}}
			>
				<MessageList avatar={avatarUrl} user={user} mensagens={listaDeMensagens} removeItem={removeItem} />
				<Box
					as="form"
					styleSheet={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<TextField
						value={mensagem}
						onChange={(event) => {
							const valor = event.target.value;
							setMensagem(valor);
						}}
						onKeyPress={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								handleNovaMensagem(mensagem);
							}
						}}
						placeholder="Insira sua mensagem aqui..."
						type="textarea"
						styleSheet={{
							width: "100%",
							border: "0",
							resize: "none",
							borderRadius: "5px",
							padding: "6px 8px",
							backgroundColor: appConfig.theme.colors.neutrals[800],
							marginRight: "12px",
							color: appConfig.theme.colors.neutrals[200],
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
}

function Header() {
	return (
		<>
			<Box className={styles.header}>
				<Text variant="heading5" styleSheet={{color: appConfig.theme.colors.neutrals[100],}}>Chat</Text>
				<Button
					variant="tertiary"
					colorVariant="neutral"
					label="Logout"
					href="/"
				/>
			</Box>
		</>
	);
}

function MessageList(props) {
   const {removeItem, avatar} = props
	return (
		<Box
			tag="ul"
         className={styles.messageList}
			styleSheet={{
				color: appConfig.theme.colors.neutrals["000"],
			}}
		>
			{props.mensagens.map((mensagem) => {
				return (
					<Text
						key={mensagem.id}
						tag="li"
						styleSheet={{
							borderRadius: "5px",
							padding: "6px",
							marginBottom: "12px",
							hover: {
								backgroundColor: appConfig.theme.colors.neutrals[700],
							},
						}}
					>
						<Box
							styleSheet={{
								marginBottom: "8px",
							}}
						>
							<Image
								styleSheet={{
									width: "20px",
									height: "20px",
									borderRadius: "50%",
									display: "inline-block",
									marginRight: "8px",
								}}
								src={`${avatar}`}
							/>
							<Text tag="strong">{mensagem.de}</Text>
							<Text
								styleSheet={{
									fontSize: "10px",
									marginLeft: "8px",
									color: appConfig.theme.colors.neutrals[300],
								}}
								tag="span"
							>
								{new Date().toLocaleDateString()}
							</Text>
						</Box>
                  <Box
                     styleSheet={{
                        display: "flex",
                        justifyContent: "space-between",
                     }}
                  >
                     <p>{mensagem.texto}</p>
                     <Image
                        styleSheet={{
                           width: "20px",
                           height: "20px",
                           borderRadius: "50%",
                           display: "inline-block",
                           marginLeft: "auto",
                           cursor: "pointer",
                        }}
                        src={`/close_white_24dp.svg`}
                        onClick={() => removeItem(mensagem.id)}
                     />
                  </Box>
					</Text>
				);
			})}
		</Box>
	);
}
