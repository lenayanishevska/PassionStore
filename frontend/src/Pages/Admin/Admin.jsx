import React from 'react'
import "./Admin.css"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Dashboard } from '../../Components/Dashboard/Dashboard';
import { OrderManager } from '../../Components/OrderManager/OrderManager';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab${index}`}
      {...other}
    >
      {value === 0 && (
        <div className="dashboard-panel">
          <Dashboard/>
        </div>
      )}
      {value === 2 && (
        <div className="dashboard-panel">
          <OrderManager/>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


export const Admin = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#AC5656',
    },
  });

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: 'Libre Baskerville',
    fontSize: theme.typography.pxToRem(18),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: '#302C29',
    '&.Mui-selected': {
      color: '#AC5656',
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#5A0900',
    },
  }),
);

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: '#FFFCF8', display: 'flex', height: 690 }}
    >
      <StyledTabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 2, borderColor: '#716D69' }}
      >
        <StyledTab label="Dashboard" {...a11yProps(0)} />
        <StyledTab label="Users" {...a11yProps(1)} />
        <StyledTab label="Orders" {...a11yProps(2)} />
      </StyledTabs>
      <TabPanel value={value} index={0}>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
