import React from 'react';
import styles from './personalsection.module.css';
import { LuAlarmClock } from 'react-icons/lu';

const Personalsection = () => {
    return (
        <div className={styles.maincontainer}>
            
            <div className={styles.headsection}>
                {/* *****************************profile section*************************** */}
                <div className={styles.profilesection}>
                    {/* ****************************Image section*************************** */}
                    <div className={styles.imagesection}>
                        <img
                            src="/images/Building1.jpg"
                            alt="Profile"
                            className={styles.profileImage}
                        />
                        <h6>Mahek Tulve</h6>
                        <div className={styles.employeebutton}>Employee</div>
                    </div>
                    {/* ******************************Contact Section************************* */}
                    <div className={styles.contact}>
                        <p>Contact Details</p>
                        <div className={styles.container}>
                            <h5>Contact Number</h5>
                            <p>3542126987</p>
                        </div>
                        <div className={styles.container}>
                            <h5>Email</h5>
                            <p>User@evgroup.co.in</p>
                        </div>
                    </div>
                </div>
                <div className={styles.joincontainer}>
                    {/* ******************************personal Information*********************** */}
                    <div className={styles.personalInfo} >
                        <p>Personal Information</p>
                        <div className={styles.containerrow}>
                            <div className={styles.container}>
                                <h5>Full Name</h5>
                                <p>Mahek Tulve</p>
                            </div>
                            <div className={styles.container}>
                                <h5>Date Of Birth</h5>
                                <p>16/05/2025</p>
                            </div>
                        </div>
                        <div className={styles.containerrow}>
                            <div className={styles.container}>
                                <h5>Marital Status</h5>
                                <p>single</p>
                            </div>
                            <div className={styles.container}>
                                <h5>Blood Group</h5>
                                <p>O+</p>
                            </div>
                        </div>
                    </div>
                    {/* *******************************LEAVE AND REPORTING******************** */}

                    <div className={styles.leaverepoting}>
                        <div className={styles.progressContainer}>
                            <div className={styles.leaveHeadline}>
                                <LuAlarmClock /> Your Leave
                            </div>
                            <div className={styles.progressGroup}>
                                <div className={styles.labelColumn}>
                                    <span>Casual Leave</span>
                                    <span>Comp Off</span>
                                    <span>Paid Leave</span>
                                </div>
                                <div className={styles.barColumn}>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFillCL}
                                            style={{ width: `20%` }}
                                        />
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFillCO}
                                            style={{ width: `30%` }}
                                        />
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFillPL}
                                            style={{ width: `60%` }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.countColumn}>
                                    <span>2</span>
                                    <span>4</span>
                                    <span>5</span>
                                </div>
                            </div>

                        </div>
                        {/* ***********************REPORTING TO********************* */}
                        <div className={styles.reportingContair}>
                            <p>Reporting to</p>
                            <div className={styles.imagecontainer}>
                            <img
                            src="/images/Building1.jpg"
                            alt="Profile"
                            className={styles.repotingImage}
                        />
                        <h6>Deepak Karki</h6>
                        <p>Site Head</p>

                            </div>
                       
                        </div>
                    </div>

                </div>

                {/* ****************************Information professional***************************** */}
                <div className={styles.proInfo}>
                    <p>Professional Information</p>
                    <div className={styles.container}>
                        <h5>Employee Id</h5>
                        <p>EV202</p>
                    </div>
                    <div className={styles.container}>
                        <h5>Designation</h5>
                        <p>APP Developer</p>
                    </div>
                    <div className={styles.container}>
                        <h5>Department</h5>
                        <p>IT</p>
                    </div>
                    <div className={styles.container}>
                        <h5>Divison</h5>
                        <p>Sector 9</p>
                    </div>
                    <div className={styles.container}>
                        <h5>Date of Joining</h5>
                        <p>17/8/2024</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Personalsection;

