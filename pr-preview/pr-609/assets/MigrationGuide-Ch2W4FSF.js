import{j as n,M as s}from"./iframe-DzfWrSPr.js";import{useMDXComponents as r}from"./index-BOhUO5Fc.js";import"./preload-helper-Dp1pzeXC.js";function t(e){const o={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(s,{title:"Migration Guide"}),`
`,n.jsx(o.h1,{id:"migration-guide",children:"Migration Guide"}),`
`,n.jsx(o.p,{children:"This guide helps you migrate to the latest version of the Wandelbots React Components library."}),`
`,n.jsx(o.h2,{id:"breaking-changes-from-2x-api-v1-to-3x-api-v2",children:"Breaking Changes from 2.x (API v1) to 3.x (API v2)"}),`
`,n.jsx(o.h3,{id:"connectedmotiongroup",children:"ConnectedMotionGroup"}),`
`,n.jsxs(o.ul,{children:[`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Import from this library, not from nova-js"}),": ",n.jsx(o.code,{children:"ConnectedMotionGroup"})," must now be imported from ",n.jsx(o.code,{children:"@wandelbots/wandelbots-js-react-components/core"})," instead of ",n.jsx(o.code,{children:"@wandelbots/nova-js"})]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Initialization"}),": Use the static ",n.jsx(o.code,{children:"connect"})," method with a NovaClient instance and motion group ID"]}),`
`]}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`// ❌ Old (don't use)
import { ConnectedMotionGroup } from "@wandelbots/nova-js"

// ✅ New (correct)
import { NovaClient } from "@wandelbots/nova-js/v2"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"

const nova = new NovaClient({ instanceUrl: "https://your-nova-instance.com" })
const connectedMotionGroup = await ConnectedMotionGroup.connect(nova, "0@your-motion-group-id")
`})}),`
`,n.jsx(o.h3,{id:"novajs-v2-api",children:"Nova.js V2 API"}),`
`,n.jsxs(o.ul,{children:[`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"All components use V2"}),": All components now use the Nova.js V2 API (",n.jsx(o.code,{children:"@wandelbots/nova-js/v2"}),")"]}),`
`]}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`// ✅ For all components, use V2
import { NovaClient } from "@wandelbots/nova-js/v2"
`})}),`
`,n.jsx(o.h3,{id:"component-props",children:"Component Props"}),`
`,n.jsxs(o.ul,{children:[`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"NovaClient or string"}),": Many components now accept either a ",n.jsx(o.code,{children:"NovaClient"})," instance or a URL string for the ",n.jsx(o.code,{children:"nova"})," prop"]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"connectedMotionGroup prop"}),": Components that work with robots now expect a ",n.jsx(o.code,{children:"ConnectedMotionGroup"})," instance"]}),`
`]}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`// ✅ Option 1: Pass NovaClient instance
<JoggingPanel nova={nova} motionGroupId="0@ur5e" />

// ✅ Option 2: Pass URL string
<JoggingPanel nova="https://your-nova-instance.com" motionGroupId="0@ur5e" />

// ✅ Where applicable, pass ConnectedMotionGroup
<RobotCard connectedMotionGroup={connectedMotionGroup} />
`})}),`
`,n.jsx(o.h2,{id:"migration-steps",children:"Migration Steps"}),`
`,n.jsx(o.h3,{id:"update-imports",children:"Update Imports"}),`
`,n.jsxs(o.p,{children:["Replace all imports of ",n.jsx(o.code,{children:"ConnectedMotionGroup"})," from ",n.jsx(o.code,{children:"@wandelbots/nova-js"})," to this library:"]}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`// Before
import { ConnectedMotionGroup } from "@wandelbots/nova-js"

// After
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-js-react-components/core"
`})}),`
`,n.jsx(o.h3,{id:"update-novaclient-usage",children:"Update NovaClient Usage"}),`
`,n.jsx(o.p,{children:"Switch to the V2 API for NovaClient:"}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`// Before
import { NovaClient } from "@wandelbots/nova-js"

// After
import { NovaClient } from "@wandelbots/nova-js/v2"
`})}),`
`,n.jsx(o.h3,{id:"update-connectedmotiongroup-initialization",children:"Update ConnectedMotionGroup Initialization"}),`
`,n.jsxs(o.p,{children:["Use the new ",n.jsx(o.code,{children:"connect"})," method:"]}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`// Before
const connectedMotionGroup = new ConnectedMotionGroup(nova, motionGroupId)

// After
const connectedMotionGroup = await ConnectedMotionGroup.connect(nova, motionGroupId)
`})}),`
`,n.jsx(o.h3,{id:"update-component-usage",children:"Update Component Usage"}),`
`,n.jsx(o.p,{children:"Ensure components receive the correct props:"}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`// Robot rendering components
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
`,n.jsx(o.h2,{id:"breaking-changes-from-4x-api-v1--v2-both-supported-to-5x-api-v2-only",children:"Breaking Changes from 4.x (API V1 & V2 both supported) to 5.x (API V2 only)"}),`
`,n.jsx(o.h3,{id:"no-support-for-v1-data",children:"No support for V1 data"}),`
`,n.jsxs(o.ul,{children:[`
`,n.jsx(o.li,{children:"The components of this package do not accept data coming from V1 API anymore. Before using the package version from 5, ensure your application is currently running on V2 API."}),`
`,n.jsxs(o.li,{children:["Components, that were still supporting V1 data: ",n.jsx(o.code,{children:"CoordinateSystemTransform"}),", ",n.jsx(o.code,{children:"SafetyZoneRenderer"}),", ",n.jsx(o.code,{children:"TrajectoryRenderer"}),", ",n.jsx(o.code,{children:"CollisionSceneRenderer"})]}),`
`]}),`
`,n.jsx(o.h3,{id:"wandelscript-editor",children:"Wandelscript Editor"}),`
`,n.jsxs(o.ul,{children:[`
`,n.jsxs(o.li,{children:["After its deprecation, Wandelscript and all corresponding components / functions, eg. ",n.jsx(o.code,{children:"WandelScriptEditor"})," are removed. Make sure the consumer application does not include mentioned functionalities or components anymore."]}),`
`]}),`
`,n.jsx(o.h2,{id:"common-issues",children:"Common Issues"}),`
`,n.jsx(o.h3,{id:"module-not-found-errors",children:'"Module not found" errors'}),`
`,n.jsxs(o.ul,{children:[`
`,n.jsxs(o.li,{children:["Ensure you're importing from the correct sub-paths: ",n.jsx(o.code,{children:"/3d"})," or ",n.jsx(o.code,{children:"/core"})]}),`
`,n.jsxs(o.li,{children:["Check that peer dependencies are installed: ",n.jsx(o.code,{children:"@wandelbots/nova-js"}),", ",n.jsx(o.code,{children:"@mui/material"}),", ",n.jsx(o.code,{children:"react"}),", ",n.jsx(o.code,{children:"react-dom"})]}),`
`]}),`
`,n.jsx(o.h3,{id:"components-not-receiving-motion-state-updates",children:"Components not receiving motion state updates"}),`
`,n.jsxs(o.ul,{children:[`
`,n.jsxs(o.li,{children:["Verify that your ",n.jsx(o.code,{children:"ConnectedMotionGroup"})," is properly connected before passing it to components"]}),`
`]})]})}function a(e={}){const{wrapper:o}={...r(),...e.components};return o?n.jsx(o,{...e,children:n.jsx(t,{...e})}):t(e)}export{a as default};
