package client

import (
	"fmt"
	"net"
	"net/smtp"
	"net/textproto"
	"os"
)

type Client struct {
	conn       net.Conn
	text       *textproto.Conn
	serverName string
	localName  string // the name to use in HELO/EHLO/LHLO
	didGreet   bool   // whether we've received greeting from server
	greetError error  // the error from the greeting
	didHello   bool   // whether we've said HELO/EHLO/LHLO
	helloError error  // the error from the hello
	recipients []string
}

func (c *Client) sendEmail() {
	from := c.localName
	to := c.recipients
	host := c.serverName

	password := os.Getenv("SMTPpwd")
	port := "587"

	address := host + ":" + port

	secret := "123h12j3kj1hrkfdsafdfadrt232jgzgf654g"
	auth := smtp.CRAMMD5Auth(password, secret)

	subject := "First Email!"
	body := "Hello world"

	message := []byte(subject + body)

	err := smtp.SendMail(address, auth, from, to, message)
	if err != nil {
		fmt.Println("Email successfully sent")
	}
}
