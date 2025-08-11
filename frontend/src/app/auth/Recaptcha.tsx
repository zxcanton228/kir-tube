import type { FC, ForwardedRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import styles from './captcha.module.scss'

type Props = { forwardRef: ForwardedRef<ReCAPTCHA>; captchaKey: string }
export const Recaptcha: FC<Props> = ({ forwardRef, captchaKey }) => {
	return captchaKey ? (
		<ReCAPTCHA
			sitekey={captchaKey}
			className={styles.recaptcha}
			ref={forwardRef}
			size='normal'
			theme='light'
		/>
	) : (
		<div>Captcha site key is invalid</div>
	)
}
