import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getCart, setLogout } from '../redux/features/authSlice';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TextField } from '@mui/material';
import { searchBooks } from '../redux/features/bookSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));




const pages = [ 'Store','Fiction', 'Non Fiction', "Self Help", "Investing"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {user,cart}=useSelector((state)=>state.auth)
  
  const dispatch=useDispatch()
  const  navigate=useNavigate()

React.useEffect(()=>{
  if(user){
dispatch(getCart(user.result._id))


}},[user])

  return (
    <AppBar position="static" className="bg-red-400">
      <Container maxWidth="xl">
     
        <Toolbar disableGutters>
        
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
         
           <Typography
            variant="h6"
            noWrap
            component="a"
          onClick={()=>navigate("/")}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
       Buy Books
           
          </Typography>
          
        
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" className="mx-2" onClick={()=>{navigate(`/category/${page.replace(" ","").toLowerCase()}`)}}>{page}</Typography>
                </MenuItem>
              ))}
              
            <div className=" flex items-center gap-2 p-2">
            <TextField      size="small" value={search}
            color="secondary"
            label="Search" onChange={(e)=>setSearch(e.target.value)} variant="outlined" />
              
            <SearchIcon
            onClick={()=>{

              dispatch(searchBooks(search))
              setSearch("")

            }}
            />
           
            </div>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={()=>navigate("/")}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Buy Book
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                className="mx-2 "
                key={page}
                
                onClick={()=>{navigate(`/category/${page.replace(" ","").toLowerCase()}`)}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}


            <div className="text-white flex items-center gap-2">
            <TextField      size="small" value={search}
            color="secondary"
            label="Search" onChange={(e)=>setSearch(e.target.value)} variant="outlined" />
              
            <SearchIcon
            onClick={()=>{

              dispatch(searchBooks(search))
              setSearch("")

            }}
            />
           
            </div>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
         

          <IconButton aria-label="cart" className="mx-4 text-white "
          onClick={()=>
          navigate("/cart")}>
          <StyledBadge badgeContent={cart?.length} >
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{user ? user.result.name.substr(0, 2).toUpperCase() : null}</Avatar>


              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem onClick={handleCloseUserMenu}>
                {user ? <Typography textAlign="center" onClick={()=>dispatch(setLogout())}>Logout</Typography>
                  : <Typography textAlign="center"

                 onClick={()=>navigate("/login")} >Login</Typography>
                }
              </MenuItem>
              
              <MenuItem onClick={handleCloseUserMenu}>
                {user?.result?.role=="admin" &&  <Typography textAlign="center"

                 onClick={()=>navigate("/editbook/0")} >Add Book</Typography>
                }
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
