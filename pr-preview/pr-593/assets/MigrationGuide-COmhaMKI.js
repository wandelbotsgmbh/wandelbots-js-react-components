import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-D_7OwatM.js";import{Ma as n,l as r,o as i}from"./iframe-DpqMHKse.js";import{t as a}from"./mdx-react-shim-KhjDAwK7.js";function o(e){let n={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i,{title:`Migration Guide`}),`
`,(0,c.jsx)(n.h1,{id:`migration-guide`,children:`Migration Guide`}),`
`,(0,c.jsx)(n.p,{children:`This guide helps you migrate to the latest version of the Wandelbots React Components library.`}),`
`,(0,c.jsx)(n.h2,{id:`breaking-changes-from-2x-api-v1-to-3x-api-v2`,children:`Breaking Changes from 2.x (API v1) to 3.x (API v2)`}),`
`,(0,c.jsx)(n.h3,{id:`connectedmotiongroup`,children:`ConnectedMotionGroup`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Import from this library, not from nova-js`}),`: `,(0,c.jsx)(n.code,{children:`ConnectedMotionGroup`}),` must now be imported from `,(0,c.jsx)(n.code,{children:`@wandelbots/wandelbots-js-react-components/core`}),` instead of `,(0,c.jsx)(n.code,{children:`@wandelbots/nova-js`})]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Initialization`}),`: Use the static `,(0,c.jsx)(n.code,{children:`connect`}),` method with a NovaClient instance and motion group ID`]}),`
`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`// ❌ Old (don't use)
import { ConnectedMotionGroup } from "@wandelbots/nova-js"

// ✅ New (correct)
import { NovaClient } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"

const nova = new NovaClient({ instanceUrl: "https://your-nova-instance.com" })
const connectedMotionGroup = await ConnectedMotionGroup.connect(nova, "0@your-motion-group-id")
`})}),`
`,(0,c.jsx)(n.h3,{id:`novajs-v2-api`,children:`Nova.js V2 API`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`All components use V2`}),`: All components now use the Nova.js V2 API (`,(0,c.jsx)(n.code,{children:`@wandelbots/nova-js/v2`}),`)`]}),`
`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`// ✅ For all components, use V2
import { NovaClient } from "@wandelbots/nova-js/v2"
`})}),`
`,(0,c.jsx)(n.h3,{id:`component-props`,children:`Component Props`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`NovaClient or string`}),`: Many components now accept either a `,(0,c.jsx)(n.code,{children:`NovaClient`}),` instance or a URL string for the `,(0,c.jsx)(n.code,{children:`nova`}),` prop`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`connectedMotionGroup prop`}),`: Components that work with robots now expect a `,(0,c.jsx)(n.code,{children:`ConnectedMotionGroup`}),` instance`]}),`
`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`// ✅ Option 1: Pass NovaClient instance
<JoggingPanel nova={nova} motionGroupId="0@ur5e" />

// ✅ Option 2: Pass URL string
<JoggingPanel nova="https://your-nova-instance.com" motionGroupId="0@ur5e" />

// ✅ Where applicable, pass ConnectedMotionGroup
<RobotCard connectedMotionGroup={connectedMotionGroup} />
`})}),`
`,(0,c.jsx)(n.h2,{id:`migration-steps`,children:`Migration Steps`}),`
`,(0,c.jsx)(n.h3,{id:`update-imports`,children:`Update Imports`}),`
`,(0,c.jsxs)(n.p,{children:[`Replace all imports of `,(0,c.jsx)(n.code,{children:`ConnectedMotionGroup`}),` from `,(0,c.jsx)(n.code,{children:`@wandelbots/nova-js`}),` to this library:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`// Before
import { ConnectedMotionGroup } from "@wandelbots/nova-js"

// After
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"
`})}),`
`,(0,c.jsx)(n.h3,{id:`update-novaclient-usage`,children:`Update NovaClient Usage`}),`
`,(0,c.jsx)(n.p,{children:`Switch to the V2 API for NovaClient:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`// Before
import { NovaClient } from "@wandelbots/nova-js"

// After
import { NovaClient } from "@wandelbots/nova-js/v2"
`})}),`
`,(0,c.jsx)(n.h3,{id:`update-connectedmotiongroup-initialization`,children:`Update ConnectedMotionGroup Initialization`}),`
`,(0,c.jsxs)(n.p,{children:[`Use the new `,(0,c.jsx)(n.code,{children:`connect`}),` method:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`// Before
const connectedMotionGroup = new ConnectedMotionGroup(nova, motionGroupId)

// After
const connectedMotionGroup = await ConnectedMotionGroup.connect(nova, motionGroupId)
`})}),`
`,(0,c.jsx)(n.h3,{id:`update-component-usage`,children:`Update Component Usage`}),`
`,(0,c.jsx)(n.p,{children:`Ensure components receive the correct props:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-tsx`,children:`// Robot rendering components
import { NovaClient } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"
import { RobotCard, Robot } from "@wandelbots/wandelbots-js-react-components/3d"

const nova = new NovaClient({ instanceUrl: "https://your-instance.com" })
const connectedMotionGroup = await ConnectedMotionGroup.connect(nova, "0@ur5e")

// Use with 3D components
<RobotCard connectedMotionGroup={connectedMotionGroup} />
<Robot connectedMotionGroup={connectedMotionGroup} />

// Jogging components
<JoggingPanel nova={nova} motionGroupId="0@ur5e" />
`})}),`
`,(0,c.jsx)(n.h2,{id:`breaking-changes-from-4x-api-v1--v2-both-supported-to-5x-api-v2-only`,children:`Breaking Changes from 4.x (API V1 & V2 both supported) to 5.x (API V2 only)`}),`
`,(0,c.jsx)(n.h3,{id:`no-support-for-v1-data`,children:`No support for V1 data`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`The components of this package do not accept data coming from V1 API anymore. Before using the package version from 5, ensure your application is currently running on V2 API.`}),`
`,(0,c.jsxs)(n.li,{children:[`Components, that were still supporting V1 data: `,(0,c.jsx)(n.code,{children:`CoordinateSystemTransform`}),`, `,(0,c.jsx)(n.code,{children:`SafetyZoneRenderer`}),`, `,(0,c.jsx)(n.code,{children:`TrajectoryRenderer`}),`, `,(0,c.jsx)(n.code,{children:`CollisionSceneRenderer`})]}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`wandelscript-editor`,children:`Wandelscript Editor`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`After its deprecation, Wandelscript and all corresponding components / functions, eg. `,(0,c.jsx)(n.code,{children:`WandelScriptEditor`}),` are removed. Make sure the consumer application does not include mentioned functionalities or components anymore.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`common-issues`,children:`Common Issues`}),`
`,(0,c.jsx)(n.h3,{id:`module-not-found-errors`,children:`"Module not found" errors`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Ensure you're importing from the correct sub-paths: `,(0,c.jsx)(n.code,{children:`/3d`}),` or `,(0,c.jsx)(n.code,{children:`/core`})]}),`
`,(0,c.jsxs)(n.li,{children:[`Check that peer dependencies are installed: `,(0,c.jsx)(n.code,{children:`@wandelbots/nova-js`}),`, `,(0,c.jsx)(n.code,{children:`@mui/material`}),`, `,(0,c.jsx)(n.code,{children:`react`}),`, `,(0,c.jsx)(n.code,{children:`react-dom`})]}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`components-not-receiving-motion-state-updates`,children:`Components not receiving motion state updates`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Verify that your `,(0,c.jsx)(n.code,{children:`ConnectedMotionGroup`}),` is properly connected before passing it to components`]}),`
`]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=n(),a(),r()}))();export{s as default};