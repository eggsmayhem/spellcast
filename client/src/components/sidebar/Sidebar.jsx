import './sidebar.css' 
import FeedIcon from '@mui/icons-material/Feed';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CellTowerIcon from '@mui/icons-material/CellTower';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SchoolIcon from '@mui/icons-material/School';
import CloseFriend from '../closeFriend/CloseFriend'

import {Users} from '../../dummyData'

export default function Sidebar() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <div className = "sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <FeedIcon className = "sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <OndemandVideoIcon className = "sidebarIcon"/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <GroupIcon className = "sidebarIcon"/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <StorefrontIcon className = "sidebarIcon"/>
                        <span className="sidebarListItemText">Magick Market</span>
                    </li>
                    {/* <li className="sidebarListItem">
                        <CellTowerIcon className = "sidebarIcon"/>
                        <span className="sidebarListItemText">Spells</span>
                    </li> */}
                     <li className="sidebarListItem">
                     <img className = "likeIcon" src={`${PF}spellicon.png`}/>
                        <span className="sidebarListItemText">Spells</span>
                    </li>
                    <li className="sidebarListItem">
                        <AutoStoriesIcon className = "sidebarIcon"/>
                        <span className="sidebarListItemText">My Grimoire</span>
                    </li>
                    <li className="sidebarListItem">
                        <SchoolIcon className = "sidebarIcon"/>
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className = "sidebarButton">Show More</button>
                <hr className = "sidebarHr"/>
                <ul className="sidebarFriendList">
                   {Users.map(u=>
                    <CloseFriend key = {u.id} user={u} />
                    )}
                </ul>
            </div>
        </div>
    )
}

