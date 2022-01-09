#!/usr/bin/expect

set timeout 20
set hostName "192.168.178.20"
set userName "Silver_Bear"
set password "StarWars4"

spawn telnet $hostName

expect "RT-AC51U login:"
send "$userName\r"
expect "Password:"
send "$password\r"
send "ip neighbour"
send "exit"
