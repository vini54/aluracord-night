import { Box } from '@skynexui/components';
import React from 'react';
import styled from 'styled-components';
import appConfig from "../../config.json";

export default function Layout ({ children }) {
  return (
   <Container className='background'>
      <Box className="box">
         {children}
      </Box>
   </Container>
  )
};


const Container = styled.div`
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   background-image: url("/background.jpg");
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
   background-blend-mode: multiply;

.box{
	display: flex;
	align-items: center;
	width: 100%;
	max-width: 700px;
	border-radius: 5px;
	padding: 32px;
	margin: 16px;
	box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
	background-color: ${appConfig.theme.colors.neutrals[700]};
}
`;