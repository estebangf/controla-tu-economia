[1mdiff --git a/imports/ui/components/AppBarCustom.jsx b/imports/ui/components/AppBarCustom.jsx[m
[1mindex 6ab9f26..9ef08e4 100644[m
[1m--- a/imports/ui/components/AppBarCustom.jsx[m
[1m+++ b/imports/ui/components/AppBarCustom.jsx[m
[36m@@ -48,11 +48,11 @@[m [mconst styles = theme => ({[m
     flexGrow: 1,[m
   },[m
   appBar: {[m
[31m-    [theme.breakpoints.up('lg')]: {[m
[31m-      margin: 200,[m
[31m-      width: 'calc(100% - 400px)',[m
[31m-      marginTop: 51[m
[31m-    },[m
[32m+[m[32m    // [theme.breakpoints.up('lg')]: {[m
[32m+[m[32m    //   margin: 200,[m
[32m+[m[32m    //   width: 'calc(100% - 400px)',[m
[32m+[m[32m    //   marginTop: 51[m
[32m+[m[32m    // },[m
     top: -1,[m
     background: theme.palette.appBar.backgroundColor,[m
     transition: 'box-shadow .1s ease',[m
[36m@@ -71,9 +71,9 @@[m [mconst styles = theme => ({[m
   },[m
   schrolled: {[m
     boxShadow: 'none',[m
[31m-    [theme.breakpoints.up('lg')]: {[m
[31m-      boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)"[m
[31m-    },[m
[32m+[m[32m    // [theme.breakpoints.up('lg')]: {[m
[32m+[m[32m    //   boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)"[m
[32m+[m[32m    // },[m
   },[m
   titulo: {[m
     color: theme.palette.appBar.color,[m
[1mdiff --git a/imports/ui/layouts/App.jsx b/imports/ui/layouts/App.jsx[m
[1mindex 597fc8c..679e181 100644[m
[1m--- a/imports/ui/layouts/App.jsx[m
[1m+++ b/imports/ui/layouts/App.jsx[m
[36m@@ -76,18 +76,14 @@[m [mSTART_MONTH.setDate(1)[m
 const styles = theme => ({[m
   root: {[m
     display: 'flex',[m
[31m-    [theme.breakpoints.up('lg')]: {[m
[31m-      /* margin: 400px, */[m
[31m-      boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 5px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',[m
[31m-      /* margin-top: 140px, */[m
[31m-      /* max-height: calc(100% - 100px), */[m
[31m-      position: 'fixed',[m
[31m-      /* margin-bottom: 0, */[m
[31m-      left: 200,[m
[31m-      right: 200,[m
[31m-      bottom: 50,[m
[31m-      top: 114,[m
[31m-    },[m
[32m+[m[32m    // [theme.breakpoints.up('lg')]: {[m
[32m+[m[32m    //   boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 5px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',[m
[32m+[m[32m    //   position: 'fixed',[m
[32m+[m[32m    //   left: 200,[m
[32m+[m[32m    //   right: 200,[m
[32m+[m[32m    //   bottom: 50,[m
[32m+[m[32m    //   top: 114,[m
[32m+[m[32m    // },[m
   },[m
   dialogPaperCalculadora:{[m
     maxWidth: 64*4,[m
[36m@@ -110,17 +106,17 @@[m [mconst styles = theme => ({[m
     margin: 'auto'[m
   },[m
   fondo: {[m
[31m-    [theme.breakpoints.up('lg')]: {[m
[31m-      position: 'fixed',[m
[31m-      backgroundColor: '#6bc18e',[m
[31m-      content: '',[m
[31m-      height: 135,[m
[31m-      width: '100%',[m
[31m-      zIndex: 0,[m
[31m-      top: 0,[m
[31m-      left: 0,[m
[31m-      right: 0[m
[31m-    },[m
[32m+[m[32m    // [theme.breakpoints.up('lg')]: {[m
[32m+[m[32m    //   position: 'fixed',[m
[32m+[m[32m    //   backgroundColor: '#6bc18e',[m
[32m+[m[32m    //   content: '',[m
[32m+[m[32m    //   height: 135,[m
[32m+[m[32m    //   width: '100%',[m
[32m+[m[32m    //   zIndex: 0,[m
[32m+[m[32m    //   top: 0,[m
[32m+[m[32m    //   left: 0,[m
[32m+[m[32m    //   right: 0[m
[32m+[m[32m    // },[m
   },[m
   fondoModerno: {[m
 /*[m
[36m@@ -153,13 +149,13 @@[m [mconst styles = theme => ({[m
   },[m
 */[m
   rootApp: {[m
[31m-    [theme.breakpoints.up('lg')]: {[m
[31m-      // padding: 50,[m
[31m-      // paddingTop: 25,[m
[31m-      // paddingBottom: 0[m
[31m-      overflow: 'auto',[m
[31m-      paddingTop: 0,[m
[31m-    },[m
[32m+[m[32m    // [theme.breakpoints.up('lg')]: {[m
[32m+[m[32m    //   // padding: 50,[m
[32m+[m[32m    //   // paddingTop: 25,[m
[32m+[m[32m    //   // paddingBottom: 0[m
[32m+[m[32m    //   overflow: 'auto',[m
[32m+[m[32m    //   paddingTop: 0,[m
[32m+[m[32m    // },[m
     minWidth: '100%',[m
     minHeight: '100%',[m
 //    background: '#00000096',[m
[36m@@ -167,7 +163,7 @@[m [mconst styles = theme => ({[m
     [theme.breakpoints.down('md')]: {[m
       background: 'transparent',[m
     },[m
[31m-    paddingTop: 47,[m
[32m+[m[32m    paddingTop: 46,[m
     zIndex: 1[m
   },[m
   transition:{[m
[36m@@ -586,8 +582,12 @@[m [mclass App extends Component {[m
 [m
     return ([m
       <div className={classes.root}>[m
[31m-        <div className={[classes.fondo, window.location.pathname == "/" ? classes.fondoModerno : ''].join(' ')} />[m
[31m-        <div className={classes.fondoSuperior} />[m
[32m+[m[32m        {[m
[32m+[m[32m          /*[m
[32m+[m[32m          <div className={[classes.fondo, window.location.pathname == "/" ? classes.fondoModerno : ''].join(' ')} />[m
[32m+[m[32m          <div className={classes.fondoSuperior} />[m
[32m+[m[32m          */[m
[32m+[m[32m        }[m
         <CssBaseline />[m
         <BrowserRouter>[m
           <Route[m
[1mdiff --git a/imports/ui/pages/Balance.jsx b/imports/ui/pages/Balance.jsx[m
[1mindex 7e61032..337f7d1 100644[m
[1m--- a/imports/ui/pages/Balance.jsx[m
[1m+++ b/imports/ui/pages/Balance.jsx[m
[36m@@ -18,7 +18,7 @@[m [mconst drawerWidth = 240;[m
 const styles = theme => ({[m
   rootList: {[m
     paddingTop: 0,[m
[31m-    paddingBottom: 55[m
[32m+[m[32m    paddingBottom: 64[m
   },[m
   titulo: {[m
     textAlign: 'center',[m
[36m@@ -33,9 +33,9 @@[m [mconst styles = theme => ({[m
     top: 47,[m
     position: "sticky",[m
     paddingTop: 5,[m
[31m-    [theme.breakpoints.up('lg')]: {[m
[31m-      top: 0,[m
[31m-    }[m
[32m+[m[32m    // [theme.breakpoints.up('lg')]: {[m
[32m+[m[32m    //   top: 0,[m
[32m+[m[32m    // }[m
 //    background: "#FFF"[m
   },[m
   listaGraficoItem:{[m
[36m@@ -60,15 +60,15 @@[m [mconst styles = theme => ({[m
     position: 'fixed',[m
     bottom: theme.spacing.unit * 1,[m
     right: theme.spacing.unit * 1,[m
[31m-    [theme.breakpoints.up('lg')]: {[m
[31m-      bottom: theme.spacing.unit * 1 + 50,[m
[31m-      right: theme.spacing.unit * 1 + 210,[m
[31m-    },[m
[32m+[m[32m    // [theme.breakpoints.up('lg')]: {[m
[32m+[m[32m    //   bottom: theme.spacing.unit * 1 + 50,[m
[32m+[m[32m    //   right: theme.spacing.unit * 1 + 210,[m
[32m+[m[32m    // },[m
   },[m
   menu:{[m
[31m-    [theme.breakpoints.up('lg')]: {[m
[31m-      bottom: 65 + 50,[m
[31m-    },[m
[32m+[m[32m    // [theme.breakpoints.up('lg')]: {[m
[32m+[m[32m    //   bottom: 65 + 50,[m
[32m+[m[32m    // },[m
     bottom: 65,[m
     background: 'transparent',[m
     boxShadow: 'none',[m
[1mdiff --git a/imports/ui/pages/Inicio.jsx b/imports/ui/pages/Inicio.jsx[m
[1mindex a6d7816..51770eb 100644[m
[1m--- a/imports/ui/pages/Inicio.jsx[m
[1m+++ b/imports/ui/pages/Inicio.jsx[m
[36m@@ -10,10 +10,8 @@[m [mimport CardHeader from '@material-ui/core/CardHeader';[m
 import CardContent from '@material-ui/core/CardContent';[m
 import CardActions from '@material-ui/core/CardActions';[m
 import Collapse from '@material-ui/core/Collapse';[m
[31m-import Avatar from '@material-ui/core/Avatar';[m
 import IconButton from '@material-ui/core/IconButton';[m
 import Typography from '@material-ui/core/Typography';[m
[31m-import { red } from '@material-ui/core/colors';[m
 import GradeIcon from '@material-ui/icons/Grade';[m
 import ShareIcon from '@material-ui/icons/Share';[m
 import ExpandMoreIcon from '@material-ui/icons/ExpandMore';[m
[1mdiff --git a/imports/ui/pages/MovimientosList.jsx b/imports/ui/pages/MovimientosList.jsx[m
[1mindex 023983e..d911227 100644[m
[1m--- a/imports/ui/pages/MovimientosList.jsx[m
[1m+++ b/imports/ui/pages/MovimientosList.jsx[m
[36m@@ -12,7 +12,8 @@[m [mimport AddIcon from '@material-ui/icons/Add';[m
 const drawerWidth = 240;[m
 [m
 const styles = theme => ({[m
[31m-  root: {[m
[32m+[m[32m  rootList: {[m
[32m+[m[32m    paddingBottom: 64[m
   },[m
   fab: {[m
     margin: theme.spacing.unit,[m
[36m@@ -20,10 +21,10 @@[m [mconst styles = theme => ({[m
     position: 'fixed',[m
     bottom: theme.spacing.unit * 1,[m
     right: theme.spacing.unit * 1,[m
[31m-    [theme.breakpoints.up('lg')]: {[m
[31m-      bottom: theme.spacing.unit * 1 + 50,[m
[31m-      right: theme.spacing.unit * 1 + 210,[m
[31m-    },[m
[32m+[m[32m    // [theme.breakpoints.up('lg')]: {[m
[32m+[m[32m    //   bottom: theme.spacing.unit * 1 + 50,[m
[32m+[m[32m    //   right: theme.spacing.unit * 1 + 210,[m
[32m+[m[32m    // },[m
   },[m
   egresosFab: {[m
     color: "#FFF",[m
[36m@@ -72,7 +73,7 @@[m [mclass MovimientosList extends Component {[m
     const { classes, pagina } = this.props;[m
     return ([m
       <div className={classes.root}>[m
[31m-        <List className={classes.root}>[m
[32m+[m[32m        <List className={classes.rootList}>[m
           {this.renderMovimientos()}[m
         </List>[m
 [m
