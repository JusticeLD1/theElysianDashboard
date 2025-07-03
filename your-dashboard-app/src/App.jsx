import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import TableChartIcon from '@mui/icons-material/TableChart'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { DataGrid } from '@mui/x-data-grid'

const drawerWidth = 240

function App() {
  const [session, setSession] = useState(null)
  const [salesData, setSalesData] = useState([])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [page, setPage] = useState('dashboard')

  useEffect(() => {
    // Check for an active session when the component mounts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for changes in authentication state (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Fetch sales data if the user is logged in
  useEffect(() => {
    if (session) {
      getSalesData()
    }
  }, [session])

  async function getSalesData() {
    const { data, error } = await supabase.from('sales').select('*')
    if (error) {
      console.error('Error fetching sales data:', error)
    } else {
      setSalesData(data)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Elysian Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button selected={page === 'dashboard'} onClick={() => setPage('dashboard')}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button selected={page === 'calendar'} onClick={() => setPage('calendar')}>
          <ListItemIcon><CalendarMonthIcon /></ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button selected={page === 'other'} onClick={() => setPage('other')}>
          <ListItemIcon><TableChartIcon /></ListItemIcon>
          <ListItemText primary="Other Feature" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  )

  // If there is no active session, show the login form
  if (!session) {
    return (
      <div style={{ width: '320px', margin: '50px auto' }}>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['github']} />
      </div>
    )
  }

  // Columns for the sales data table
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'product', headerName: 'Product', width: 180 },
    { field: 'amount', headerName: 'Amount', width: 120, type: 'number' },
    { field: 'region', headerName: 'Region', width: 140 },
  ]

  // Main content for each page
  let mainContent
  if (page === 'dashboard') {
    mainContent = (
      <Box sx={{ height: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom>Sales Data</Typography>
        <DataGrid
          rows={salesData.map(row => ({ ...row, id: row.id }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          sx={{ backgroundColor: 'white', borderRadius: 2 }}
        />
      </Box>
    )
  } else if (page === 'calendar') {
    mainContent = (
      <Box>
        <Typography variant="h5" gutterBottom>Calendar (Coming Soon)</Typography>
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="body1">Calendar feature placeholder</Typography>
        </Box>
      </Box>
    )
  } else {
    mainContent = (
      <Box>
        <Typography variant="h5" gutterBottom>Other Feature (Coming Soon)</Typography>
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="body1">Other feature placeholder</Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Elysian Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {session.user.email}
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, bgcolor: '#f0f2f5', minHeight: '100vh' }}>
        <Toolbar />
        {mainContent}
      </Box>
    </Box>
  )
}

export default App