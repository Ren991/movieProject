import React, {useState,useEffect} from 'react'
import {Container,Grow,Grid,Paper,AppBar,TextField,Button} from '@material-ui/core'
import { useNavigate,useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import {useDispatch} from 'react-redux';
import {getPosts,getPostsBySearch} from '../../actions/posts';
import Pagination from '../Pagination';
import Posts from '../Posts/Posts' 
import Form from '../Form/Form'
import useStyles from './styles'

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home=()=>{
  
    const [currentId,setCurrentId] = useState(0)
    const classes= useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const [search,setSearch] = useState('');
    const [tags,setTags] = useState([]);
    const history = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery= query.get('searchQuery');


    const searchPost=()=>{
      if(search.trim()|| tags){
        dispatch(getPostsBySearch({search, tags: tags.join(',')}))
        history(`/posts/search?searchQuery=${search||'none'}&tags=${tags.join(',')}`)
      }else{
        history('/')
      }
    }

    const handleKeyPress=(e)=>{
      if(e.keyCode===13){
        searchPost();

        }
      }
    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
    return(
        <Grow in>
            <Container maxWidth="xl">
              <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                  <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <AppBar className={classes.appBarSearch} position="static" color="inherit">
                    <TextField
                      name="search"
                      variant="outlined"
                      label="Search movies"
                      onKeyPress={handleKeyPress}
                      value={search}
                      onChange={(e)=>setSearch(e.target.value)}
                    />
                     <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
                  <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                  </AppBar>
                  <Form currentId={currentId} setCurrentId={setCurrentId}/>  
                  <Paper elevation={6}>
                    <Pagination page={page}/>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Grow>
    )
}
export default Home
