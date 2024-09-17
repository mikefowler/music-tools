import {
  AspectRatio,
  Box,
  Card,
  Grid,
  Link,
  Sheet,
  Typography,
} from '@mui/joy';
import React from 'react';
import Page from '../components/Page';
import { Link as RouterLink } from 'react-router-dom';

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <Page title="Hey there!">
      <Typography level="body-md" mb={2}>
        This website is a collection of tools I've created for learning music
        theory and playing guitar.
      </Typography>

      <Typography level="body-md" mb={2}>
        I hope you find them helpful.
      </Typography>

      <Typography level="body-sm" mb={2}>
        - <Link href="https://stillwithin.us">Mike Fowler</Link>
      </Typography>

      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid md={6}>
          <Card orientation="horizontal" size="sm" variant="outlined">
            <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
              <Sheet variant="soft" />
            </AspectRatio>
            <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
              <Typography level="title-md">
                <Link to="/key" component={RouterLink} overlay>
                  Key
                </Link>
              </Typography>
              <Typography level="body-sm">
                Fretboard charts for the selected key and its diatonic chords.
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid md={6}>
          <Card orientation="horizontal" size="sm" variant="outlined">
            <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
              <Sheet variant="soft" />
            </AspectRatio>
            <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
              <Typography level="title-md">
                <Link to="/scales" component={RouterLink} overlay>
                  Scales
                </Link>
              </Typography>
              <Typography level="body-sm">
                Fretboard charts for the selected key and its diatonic chords.
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid md={6}>
          <Card orientation="horizontal" size="sm" variant="outlined">
            <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
              <Sheet variant="soft" />
            </AspectRatio>
            <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
              <Typography level="title-md">
                <Link to="/sheet" component={RouterLink} overlay>
                  Sheet
                </Link>
              </Typography>
              <Typography level="body-sm"></Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default HomePage;
