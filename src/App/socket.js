import React, {Component} from 'react'
import socketIOClient from "socket.io-client";
let IP = "3.6.140.2";
let PORT = [5021, 5021, 5021];
const ENDPOINT = `http://${IP}:${PORT[0]}/`;
const socket = socketIOClient(ENDPOINT);
export default socket;