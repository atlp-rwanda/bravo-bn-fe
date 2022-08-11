import Button from "../Btn"
import React,{useEffect,useState} from 'react';
import axios from 'axios';

const Details  = ({setOpenpopup,openPopup}) => {

   


    const styles = {
        transform:'translateY(0%)',
        transition: 'all 1s ease'
    }

    return (
        
    
        <div className={`container`} style={styles}>
            
                <div>
                <div>
                    <img src="https://media-exp1.licdn.com/dms/image/C4E03AQGls0evv2rK2Q/profile-displayphoto-shrink_800_800/0/1584021640268?e=1665619200&v=beta&t=uO5zwr2Fb3xIvgCRLaT-U9OLTlSrt8W7Fi9bYpk2zSI" alt="Avatar"/>
                </div>
                <div class="card-content">
                        <span>Email:</span>
                        <span>Phone Number:</span>
                        <span>Gender:</span>
                        <span>username:</span>
                        <span>Birthdate:</span>
                        <span>Verified:</span>
                        <span>Role:
                            <select>
                                <option value="">Travel Team Member </option>
                                <option value="">Manager </option>
                                <option value="">Requester</option>
                            </select>
                        </span>
                </div>
            </div>
            
            
            <div className="buttons">
                <Button variant="primary">Save</Button>
                <Button variant="secondary" onClick={() => setOpenpopup(false)}>Close</Button>
            </div>
        </div>


      );
}
 
export default Details;