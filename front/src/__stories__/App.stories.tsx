import { MockedProvider } from '@apollo/client/testing';
import App from '../App';
import { GET_CURRENT_USER } from '../api/users';
import { MemoryRouter } from 'react-router-dom';
import { GET_PEOPLE } from '../api/people';

const component = {
  title: 'App',
  component: App,
};

localStorage.setItem('refreshToken', 'xxx-refresh');
localStorage.setItem('accessToken', 'xxx-access');

const mocks = [
  {
    request: {
      query: GET_CURRENT_USER,
    },
    result: {
      data: {
        users: [
          {
            id: '16506ba8-196c-4c13-a4a7-a22cb5eccfa1',
            email: 'charles@twenty.com',
            displayName: 'Charles Bochet',
            workspace_member: {
              workspace: {
                id: '7ed9d212-1c25-4d02-bf25-6aeccf7ea419',
                domain_name: 'twenty.com',
                display_name: 'Twenty',
                logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAJ82lDQ1BJQ0MgUHJvZmlsZQAASImFlnk8lWkbx+/nOfuG43DsHPuWfTvIvm/Z11SOY986Tra0SypMSpJQosZaNJUlI0mKygiFFjVkhDKNFqlU5jnMTE3v+3nf63yuz/X9XM99/851388fzw8AUgCLw4mDBQCIT0jiejlYMwICgxi4KYACkoAKmIDKYm/iWHl4uAIk/q7/jnfDAOLVuxo8rf98/j+DGha+iQ0A5IEwk83hJiG8D2Gf1CQOj0cRFuIiQyE8x+PIZYbRPA5dYdHlNT5eNgivAgBPZrG4kQAQmUifkcKORHSIAQhrJ4RFJyDM0zePiEtOQ7iH14+P3xiG8HuEVZD1HABIDN48od9oRv5LP/QffRYr8h+Oj0tm/3Uu3o2QwxN8vZEqjqQkiACaIA4kgzTAABzABRuRTjTSCUfu/r/vYy7vs0FWcsBmZEc0iARRIAnZb/+NlveyUhJIBSxkTTjScUV+Nrz3uCL5hr6sCtFvfe1lvAXALGxpaanta89VAYCLe5CzPPvaU24HgE8EgJ4cdjI3ZaXHu3qAAUTAD4SAGJAG8kAFaABdYAhMgSWwA87AHfiAQLAesJF545GpUsFWsAtkgRxwEBwBxaAMnALV4Cw4D5pBG7gKboDboB8MgUdgDEyCF2AOvAOLEAThIApEg8QgGUgRUod0ISZkDtlBrpAXFAiFQJFQApQMbYV2QzlQPlQMlUM10E/QJegqdBMagB5A49AM9Br6CKNgMiwES8FKsBbMhK1gF9gHXgdHwolwOpwJH4CL4Ar4DNwEX4Vvw0PwGPwCnkcBFAlFR8miNFBMlA3KHRWEikBxUdtR2ahCVAWqHtWK6kbdRY2hZlEf0Fg0Dc1Aa6BN0Y5oXzQbnYjejs5FF6Or0U3oLvRd9Dh6Dv0FQ8FIYtQxJhgnTAAmEpOKycIUYioxjZjrmCHMJOYdFoulY5WxRlhHbCA2BrsFm4s9jm3AdmAHsBPYeRwOJ4ZTx5nh3HEsXBIuC3cMdwZ3BTeIm8S9x5PwMnhdvD0+CJ+Az8AX4mvx7fhB/BR+kSBAUCSYENwJYYTNhDzCaUIr4Q5hkrBIpBKViWZEH2IMcRexiFhPvE4cJb4hkUhyJGOSJymatJNURDpH6iGNkz6QBclqZBtyMDmZfIBcRe4gPyC/oVAoShRLShAliXKAUkO5RnlCec9H49Pkc+IL49vBV8LXxDfI95KfwK/Ib8W/nj+dv5D/Av8d/lkBgoCSgI0AS2C7QInAJYERgXkqjapDdafGU3OptdSb1GlBnKCSoJ1gmGCm4CnBa4ITNBRNnmZDY9N2007TrtMmhbBCykJOQjFCOUJnhfqE5oQFhfWF/YTThEuELwuP0VF0JboTPY6eRz9PH6Z/FJESsRIJF9kvUi8yKLIgKiFqKRoumi3aIDok+lGMIWYnFit2SKxZ7LE4WlxN3FM8VfyE+HXxWQkhCVMJtkS2xHmJh5KwpJqkl+QWyVOSvZLzUtJSDlIcqWNS16RmpenSltIx0gXS7dIzMjQZc5lomQKZKzLPGcIMK0Yco4jRxZiTlZR1lE2WLZftk12UU5bzlcuQa5B7LE+UZ8pHyBfId8rPKcgouClsVahTeKhIUGQqRikeVexWXFBSVvJX2qvUrDStLKrspJyuXKc8qkJRsVBJVKlQuaeKVWWqxqoeV+1Xg9UM1KLUStTuqMPqhurR6sfVB1ZhVhmvSlhVsWpEg6xhpZGiUacxrknXdNXM0GzWfKmloBWkdUirW+uLtoF2nPZp7Uc6gjrOOhk6rTqvddV02boluvf0KHr2ejv0WvRe6avrh+uf0L9vQDNwM9hr0Gnw2dDIkGtYbzhjpGAUYlRqNMIUYnowc5k9xhhja+Mdxm3GH0wMTZJMzpv8YaphGmtaazq9Wnl1+OrTqyfM5MxYZuVmY+YM8xDzk+ZjFrIWLIsKi6eW8pZhlpWWU1aqVjFWZ6xeWmtbc60brRdsTGy22XTYomwdbLNt++wE7Xztiu2e2MvZR9rX2c85GDhscehwxDi6OB5yHHGScmI71TjNORs5b3PuciG7eLsUuzx1VXPlura6wW7ObofdRtcorklY0+wO3J3cD7s/9lD2SPT42RPr6eFZ4vnMS8drq1e3N817g3et9zsfa588n0e+Kr7Jvp1+/H7BfjV+C/62/vn+YwFaAdsCbgeKB0YHtgThgvyCKoPm19qtPbJ2MtggOCt4eJ3yurR1N9eLr49bf3kD/wbWhgshmBD/kNqQTyx3VgVrPtQptDR0jm3DPsp+EWYZVhA2E24Wnh8+FWEWkR8xHWkWeThyJsoiqjBqNtomujj6VYxjTFnMQqx7bFXsUpx/XEM8Pj4k/lKCYEJsQtdG6Y1pGwc46pwszliiSeKRxDmuC7dyE7Rp3aaWJCHk49mbrJK8J3k8xTylJOV9ql/qhTRqWkJa72a1zfs3T6Xbp/+4Bb2FvaVzq+zWXVvHt1ltK98ObQ/d3rlDfkfmjsmdDjurdxF3xe76JUM7Iz/j7W7/3a2ZUpk7Myf2OOypy+LL4maN7DXdW7YPvS96X99+vf3H9n/JDsu+laOdU5jzKZede+sHnR+Kflg6EHGgL88w78RB7MGEg8OHLA5V51Pz0/MnDrsdbipgFGQXvD2y4cjNQv3CsqPEo8lHx4pci1qOKRw7eOxTcVTxUIl1SUOpZOn+0oXjYccHT1ieqC+TKssp+3gy+uT9cofypgqlisJT2FMpp56d9jvd/SPzx5pK8cqcys9VCVVj1V7VXTVGNTW1krV5dXBdct3MmeAz/Wdtz7bUa9SXN9Abcs6Bc8nnnv8U8tPweZfznReYF+ovKl4sbaQ1ZjdBTZub5pqjmsdaAlsGLjlf6mw1bW38WfPnqjbZtpLLwpfz2ontme1LV9KvzHdwOmavRl6d6NzQ+ehawLV7XZ5dfdddrvfcsL9xrduq+0qPWU/bTZObl24xbzXfNrzd1GvQ2/iLwS+NfYZ9TXeM7rT0G/e3DqweaB+0GLx61/bujXtO924PrRkaGPYdvj8SPDJ2P+z+9IO4B68epjxcfLRzFDOa/VjgceETyScVv6r+2jBmOHZ53Ha896n300cT7IkXv2367dNk5jPKs8Ipmamaad3pthn7mf7na59PvuC8WJzN+p36e+lLlZcX/7D8o3cuYG7yFffV0uvcN2Jvqt7qv+2c95h/8i7+3eJC9nux99UfmB+6P/p/nFpM/YT7VPRZ9XPrF5cvo0vxS0scFpe1bAVQSMIREQC8rgKAEggArR/xD2tXPNdffgb6xtn8zeDO+FcuMlvxZcthCEA9UryQtOkA4BySSjsRbUsAeBbRxxLAenr/5F/xf//vO17xe7zAIs73pC2PHhz2LAffxYoX/Oac31fAm0IffF//BHDgtSSRPWioAAAAeGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAAqACAAQAAAABAAAAMqADAAQAAAABAAAAMgAAAADJOUoaAAAACXBIWXMAAAsTAAALEwEAmpwYAAACBGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjAwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjIwMDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgqA8BIZAAAOx0lEQVRoBe1ZaWxU1xX+3jozHtt4B2OzeGEnELYAIaQQwqI0C1FSGmWp0kqRmkpVm0ptf1SpUKVKVaWqP1oprdq0StTsLUlElUYJAZJCUkLCTlhsdvAGxsbbzLzt9jt3bLALBI8SGinKlWfG8967955zz3fO+c4ZQz32G4UvwTC/BDpoFb5S5GqW/KJwOjyLUDqlDCiDL/S/DCDi6/Jh6euKT/4/lbIvF2ToFRFG2ZS4X2XqwsG3kO/h5aIaKoSSZx2+RfyUZy5/TBb5XMenKkIjwLAtGGkfqisDlaH0/FMubyRtmPnxrDDRJUkji/eDCFFzCmaMcwtcwBqe4T+LZldWRA7RNGAohajpAvzacqjF02CMLoUR45TOXkTHmmHuPAZHLJNPYamMsqhgVxr+/Mkwbp2O4OMDcHafgJnxudZnEfPac4coInuJDxiyaxQhHfD74ythL5wGuyBfAHURJYqQCZrPIvP39+DsaISZR+sImnooNBWJ3TgB4MtvaELwqxfgyk7EnHjY9RhDbC6C6gt8CzJU6Yl7kFgxHyaVELgPDBHFpLO41RUwZtfBbEshok8YXoCwegSsutEDjwIXumC1pzRELx3Dpduf13+XWcSgYwctPQgeW47EjHqEQQiTfqJ6CZnjLTD7UgiLCmBVldMKMZi8Hzm0IqGITvrRqomwSkfAJywtKht8dAAJl/OpvRzU9RpDFNE78VSj6iINJyILFpXwjzcj+NN6OIfawKAEwzXhTRkF66HlhGFWNJOx2Pd588Z6hmmxrIHwbCfsHSegimIwfNq0/1m5P/BF/PDzGEMUMUwT6gJPfN4EODx1gVmUyiB8+g3kNZyDqizQTi0u5Bxug/+L52GMKoQ1ktfTHsIxRbBqqvU8ES9oPAm7pQtGdSFC+pRpUD0uqsM2I5t+kJCMxDMDMRk/s1rmrJt2iYFZEv+VF8EupWD9w2+7APvoOaAsCXhh9mRFiMIYHEYrq6OP4ZjQ6UzDmFULq6SQMGIE4ytiEDDyHR0BZSPV2YPwdCe8TAZBkpY2GTDOUFHOVVRIJ92BjXP8HGIRPZdmVwyl/SgQr84uSQzJKV+8LphiZJP8LY8EPACBlRaY96LWDlgSeovi8BmuDcNFuHymjmRGRQn9y0UURvBbziLcuAv2+0dglsSz1rq4yfC1GaKIIfhnnghbOrggF2Fys0cVwZtWCftDClVVSC2pjmTrs73wixNQI+lPze2IxhbBrK3SO4vCUcNpwqobQYGFcPF0WHcuhF1VoZWW+/KSza2KYoTT6+GP2wLrpX/DKaHlxeI5jqHQUjzhfEJm90n47ed1yDVtB/ajdyCzsA5eZwqZ873IhAFSC2uhnnwY5iImyr3tUHPrYNOvIipq0FLhnkaKohB+Zzmc794DR0I1T1oOWzK/ygRaGXke9E139WJEt06G6khpJiCK5jKGWEQmClYtChts+BjRg4xKVM6qLIPxozWIztBX+jIweGqxsmIdlv09hxD4BNjMer2vQWnDtg7Yu04gKmC0mjheCywQVG3nkd55GGggK+jloUwchcRtN5HG5GsIWysWINp8mGFb+73kz2EzgiGKaBohYbIiD+brHyEoGQF3FTeiiJZjwxg/SvuAfBd6JeiToaaUwq69lATDw4xW9AuBoDp2BvaYCqS37IHxt42I7z+HwOLkGAPFuv3otWMouOsWSKjHmJEIpo6EeZwHFnNkZbk6rDFEkew0ikkntOh46ul3kGk6C2vFbNgVtIrjZKm7POh5iE60AJv3I1pBClNIbBMmkmeUUJYEHSzDQznShBRzjP3jlxDVJ5G6axrMWfUw6qvhlJdQXvpkGNIKPH76pz+pCmpPE1DpwvS4kZzaMMYQRbJzOFliOU/TKUvAfnM3/E37uMFIhKNLuBmzeYp8qqkdFiGiSE/Mb92e3U9gdbYdJqOVEafScZNBohHqH9sR3kdfoh/EJ43TBx0SZsGOg+RzPgqXztO5hKrDqhnLaPYf2JRBxBimHjpwXF1fWsYoy4NLHEWHW+HsPcPExaWlPkkQaskYM3wSJqEzsKEirNBBWFUWZq+dT8G7exbcR1bBSsSQ3sfc8vIWoLEVdkMH3Admwp89FXacZxqPAWPJtIsYDembegGx/jDGEItc8XlGmEhiW9LVgg84oKGdRMEmRQ7++E948yYCk8Yi3NGAOHOEODdIWcLyfNj3LdVKeMdaEP3yZeQxgaIyiaiPSXRCFXzWO5GXgktFTPplVFMOHKOfiHLD9JNrK8KlTB3WKZpQCFFALy90n3ag/e39J6E+PIKIJ+nm0VKF8awvSW2yYBLizPayhMr0wWkmExhXAHWoHalxRci7ZTZS3SkEPd2I0w/FyT36iSN+QlZA9qn3u9bbsBQZWESimuBW4qLU74xdMBgrRXDYDNsUXLVTZJ64WZLHUM7lSUK18rSqM2Ec/LWr0XXgOJzR5YjNv4GhPB/m9v2SSoBptTphWgzZUbhN8vGwR06KZFfVmmSTGzdXzT3wmETVDWMACc+EVaadrHfncbjtvXD3noLX1Y1YMa3CA7CWzEXhrXMu8q9AWMS696Hm18E/0cZIeBpg1EMZoyYDjuw2nGHk2mmURCyNBaPXQ4aMNbxzDpxFN8AaTVhIfd+/a9jZDf+tj2D9eROihxbAXrNM+4nclmfClIfg4AmEL2xEovUCaxobmdY+xM710ddIhRj1xPKW3rB/0U/5yN0ijFhGex/66sibvr0KiQnVevkBBTSi5Y10JbZmKTLcwf7dRoRHmxHOJalkSRy098Dax6RJa8XK81gq+PCWTYe7ZA68de/C2dIAK84+gECZS+m1L/5zZW1yU0RoLiOMf+NYuI+vhlUkJTDZL7cKSdG9ti6YBLY9lhCTzglpurvyZqT3HkfyQAsTXSudN4DDwgzSXRnNk2eID0YkYa9cwLqmBMb3v4Fw1k4Yf31bw9QQfxQIM3pKrXK1mj83RSicojWimyYgRiWk5gBL4L6N2+EwaVpnOqGOXEDvPdOQ98T9bBcldMi2bp2BcNdpmGTImtnKPGHQcgDN3VA//DpcKhH1l9XBuU4Ep3oYmqkY632bymJkXpYXSfgbMP8g4+SmCBc0RyQQvn8Q4ZKb2FggE/7Da0i8fQiKhZKqK0e0ejbi08az2UClKasEN2tqDYKyfMRoTT1EB7FudxrBnBrYN1NRhnUpq7s/PgjV5yHx1GNQBYQdc01m+wFYr++AI3uIH/angEF6XCOzD35S/ucCitncOdiCYN9RRB/sRvyVPfDunQKsoNPPmAxLkmEz6Qed3alkoSQCspAK5tVBbdoLo4icTE6YGvrS8HtgCWsg8iou73UQmqRAyYdWIeQFOXh5qbpq+NNrkfr9eiSkVpG4LIcxaFhr56xcO+j7tf8lTk02qYxdR6DorP73liHGesWuqUJ46Dj8lzfBeHId20IFMGortSQWIan7xBv3sbWU0L4TnqVP3bsA8SWz9J4RywNv/VbY2z9BsHUf+2MpWKNIVEkkI5JKd1QpWQJ9aoOsIYFAm5VzsxrlBi3ZUrK7wKKtG+E3FyF+/1JWkyFSz7wB+7ltiI/miVeRMzmsDM+xHqcjo8CGNbEaUS1DdCczO080HF2M2ErCUwb9JfPiBsRe+ZAOz0Ygv/vvNaKXpDLv8fvIxPNpxAgOG36ZOWNgH26CSpAyDYKYWDSnIaaWbB2OK4Wzks07fs2QKDrPb4M7nRyJDQmvzYM5eTwC3kyT5eozy09CLWQF2MPGQ0daQ8os5QlzBMeb4K7fBau+WFN5RWpiTypG/gfHkH51sz58iYwm6YtJKyt2MwVems/pFWjk/s/hfVCiiJRE9WZ4uiNhJUlDOFMacuH4EnhHOxCc572fEmqTxsBhBwYHTmici+kNUpCgi1Fv0UQY86awd5GFRcBnTFL+bHefPiARrZf+w/Ds7j2JoJdWJAq0z7Axris6maorwazouUGLK4k5FfOAwbwhTqtYENl0ZmPtI4hOs9AaWYH42DJNEo1tn8Bt7oTPjqW//wjxf4iJMg/W3YtgEnoimH++B1FNJQKGaidinWjb2Zwh8BX2TAZsayLWH33bL0DFqZQmfZc6O7lZRJSXUyS3spgXQkLC5IaST+zKErjzpsISJfhI8OZ2mJv3wW5lE+NnzyD+l82wtxxDtGYRLCmLiXlRJH30DPImjYV69DYER5g72OAQ8ZQK4B/j3OVzYEuDXLbu6YNB/5BWreDNkOCn7+QKLU6SiQZDkJnHmP7sW/DYThVnD2kd6UoG9Bfvqddh/nUD7BHSp4rgFhDbbJt6Myph3T5Pw9HkKQenWhHsPMTDsOAuYi757cPom80K0XThJ5ivfnInEl+bpXOM7OvvPwq7sT1bp+io1a8FP3KDFidoaAqGaXLnVDuCnz+H9EzyLVZ/DmFkNLQgxl3NElZ5GnqEAU8uIz83/GAFf56gXxEyEaHl/+sDJMmSwwczMJmfYuxvqSk17Ej2wiaJNAv5LC1n0epBVy/MV7ZwXdY6NDnZT7akoEyiZM6KyCSZqUNfwoH0OhwKo6mHVHRs2ulBJfSz4i0kS0aSAnTx5wcmNPEPb3cD7HdYh5ABpN/dgcQdCzVsTYk//dFM0dKw+Jsko2TmhbeRONMBU9bn2jKy6+t/c1ckO63/XZxBBn1GcxExd/8m2Rt8F9LHLO4ywvi/fhX+7YdhEPfha1vZx6BjM1y7z76LDE/dWTaXSvIap4mQBpUIOi4gfHEj8t45AIwi32L/eagK/CpXcq1HstOG/y6lkUTJSLAg/IvOrFjHmKwqhYeFvM56ElFLH9ILx8NePIORj73hDNtNR9il2bADsVYm1mLCjKRSl9dX2D5naF1hjWtcYvuUucfiQUqn3ygkNOS4tf/Qlxg45DcSsyqJ5F5Gwq2NCNmhkVziCnVnFycqFUsInAaDaei2110RipltXmisUJRB0LuYz+SekEH5mYI/VzDlXZJZrNf/I5FOHYK7K4zrrojsOXCOFwW/giD6nvjYgN9d7ZkrXJdLuSfEqyz0RV/+SpEv2gL/u/+XxiL/BXU7ACIRR4XYAAAAAElFTkSuQmCC',
                __typename: 'workspaces',
              },
              __typename: 'workspace_members',
            },
            __typename: 'users',
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_PEOPLE,
      variables: { orderBy: [{ created_at: 'desc' }], where: {} },
    },
    result: {
      data: {
        people: [],
      },
    },
  },
];

export default component;

export const RegularApp = () => {
  return (
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    </MemoryRouter>
  );
};
