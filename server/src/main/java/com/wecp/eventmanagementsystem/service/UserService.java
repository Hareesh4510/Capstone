package com.wecp.eventmanagementsystem.service;

import com.wecp.eventmanagementsystem.entity.User;
import com.wecp.eventmanagementsystem.repository.UserRepository;

import Exception.UserExistsException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final  PasswordEncoder passwordEncoder;
    

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

   

    public User registerUser(User user) {
        if ((userRepository.existsByUsername(user.getUsername())) && (userRepository.existsByEmail(user.getEmail()))){
            throw new UserExistsException("User alreay exists! Please try another username and Email");}

       
 else if(userRepository.existsByEmail(user.getEmail())){
    throw new UserExistsException("User alreay exists! Please try another email.");
}else if (userRepository.existsByUsername(user.getUsername())){
    throw new UserExistsException("User alreay exists! Please try another username.");}
     
else{
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }
}

    public User loginUser(String username, String password) {
        // Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        // if(authentication.isAuthenticated())
        // {
        //     return user
        // }
        User user = userRepository.findByUsername(username);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u1 = userRepository.findByUsername(username);
        if (u1 == null) {
            throw new UsernameNotFoundException("User Not Found");
        }
        return new org.springframework.security.core.userdetails.User(
                u1.getUsername(),
                u1.getPassword(),
                new ArrayList<>());
    }

    

}
