from telnetlib import *

te = Telnet("192.168.178.20", "23", 3)

te.write(b"Silver_Bear\n")
te.write(b"StarWars4\n")
print te.read_eager()

te.write(b"ls -l\n")
print te.read_eager()

te.write(b"exit\n")

te.close()
