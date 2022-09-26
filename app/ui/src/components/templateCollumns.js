import { Grid, GridItem } from '@chakra-ui/react'
import Navbar from './Navbar/Navbar'

function TemplateCollumns() {
    return (
        <Grid 
            templateAreas={`"nav main" "nav main"`}
            gridTemplateRows={'50px 1fr'}
            gridTemplateColumns={'15em 1fr'}
            h="calc(100vh)"
            gap='0'
            color='blackAlpha.700'
            fontWeight='bold'
        >
            <GridItem pl='2' bg='teal.400' color={'whiteAlpha.900'} area={'nav'} height={`calc(100vh)`} width={['100%']}>
                <Navbar />
            </GridItem>
            <GridItem pl='2' area={'main'}>
                Content
            </GridItem>
        </Grid>
    )
}

export default TemplateCollumns