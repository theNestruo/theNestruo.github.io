class StevedorePassword {

	constructor(form) {
		this.form = form;

		this.passwordSalt = 0x05;
		this.byte1 = 0x00;
		this.byte2 = 0x00;

		this.refresh();
	}

	refresh() {

		// Enforces coherent values
		var chapters = parseInt(this.form.chapters.value);
		if (chapters < 2) {
			this.form.chapters.value = "2";
		} else if (chapters > 5) {
			this.form.chapters.value = "5";
		}
		switch (parseInt(this.form.chapters.value)) {
			case 1: this.form.star1.checked = false; // (should never happen)
			case 2: this.form.star2.checked = false;
			case 3: this.form.star3.checked = false;
			case 4: this.form.star4.checked = false;
				this.form.star5.checked = false;
		}
		if (this.form.secret.checked) {
			this.form.chapters.value = "5";
			this.form.star1.checked = true;
			this.form.star2.checked = true;
			this.form.star3.checked = true;
			this.form.star4.checked = true;
			this.form.star5.checked = true;
		}

		// Parses input
		var chapters = "000" + new Number(this.form.chapters.value).toString(2);
		this.byte1 = parseInt(
			(this.form.secret.checked ? "1" : "0")
			+ "0"
			+ chapters.substring(chapters.length - 3), 2);
		this.byte2 = parseInt(
			(this.form.star5.checked ? "1" : "0")
			+ (this.form.star4.checked ? "1" : "0")
			+ (this.form.star3.checked ? "1" : "0")
			+ (this.form.star2.checked ? "1" : "0")
			+ (this.form.star1.checked ? "1" : "0"), 2);

		// Generates a password
		this.form.passwords.value = this.encodePassword(Math.floor(Math.random() * 0x10));
	}

	encodePassword(seed) {

		// Seed
		var digit0 = seed;
		var checksum = digit0;
		var password = digit0.toString(16);

		// Byte 1, low nibble
		var digit1 = ((this.byte1 ^ digit0) + this.passwordSalt) & 0x0f;
		checksum += digit1;
		password += digit1.toString(16);

		// Byte 1, high nibble
		var digit2 = (((this.byte1 >> 4) ^ digit1) + this.passwordSalt) & 0x0f;
		checksum += digit2;
		password += digit2.toString(16);

		// Byte 2, low nibble
		var digit3 = ((this.byte2 ^ digit2) + this.passwordSalt) & 0x0f;
		checksum += digit3;
		password += digit3.toString(16);

		// Byte 2, high nibble
		var digit4 = (((this.byte2 >> 4) ^ digit3) + this.passwordSalt) & 0x0f;
		checksum += digit4;
		password += digit4.toString(16);

		// Checksum
		var digit5 = ((checksum + this.passwordSalt) & 0x0f);
		password += digit5.toString(16);

		return password;
	}
}

var stevedorePassword = new StevedorePassword(stevedorePasswordForm);
